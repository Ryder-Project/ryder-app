import { Request, Response } from "express";
import { Op } from "sequelize";
import { v4 as uuidV4 } from "uuid";
import { HTTP_STATUS_CODE } from "../../constants/httpStatusCode";
import {
  passwordUtils,
  PasswordHarsher,
  generateLongString,
  sendRegistrationEmail,
  validatePassword,
} from "../../utilities/helpers";
import logger from "../../utilities/logger";
import { customerRegisterSchema } from "../../utilities/validators";
import Customers from "../../models/customers";
import ENV, { APP_SECRET } from "../../config/env";
import * as jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const registerCustomer = async (req: Request, res: Response) => {
  const passwordRegex = passwordUtils.regex;
  try {
    const userValidate = customerRegisterSchema.strict().safeParse(req.body);

    if (userValidate.success) {
      const { firstName, lastName, email, phone, password } = userValidate.data;
      const newEmail = email.trim().toLowerCase();

      if (!passwordRegex.test(password)) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
          message: passwordUtils.error,
        });
      }

      const userExist = await Customers.findOne({
        where: {
          [Op.or]: [{ email: newEmail }, { phone: phone }],
        },
      });

      if (!userExist) {
        const hashedPassword = await PasswordHarsher.hash(password);
        const id = uuidV4();

        const user = await Customers.create({
          id,
          firstName,
          lastName,
          email: newEmail,
          phone,
          password: hashedPassword,
          isVerified: false,
        });

        console.log("user", user);

        // Send registration email with user info
        const info = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };

        const url = `${process.env.FE_BASE_URL}/login`;

        await sendRegistrationEmail(user.email, info, url);

        return res.status(HTTP_STATUS_CODE.SUCCESS).json({
          message: `Registration Successful`,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        });
      } else {
        return res.status(HTTP_STATUS_CODE.CONFLICT).send({
          message: "This account already exist",
        });
      }
    } else {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: userValidate.error.issues,
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: [
        { message: `This is our fault, our team are working to resolve this.` },
      ],
    });
  }
};

export const loginCustomer = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  try {
    const customer = await Customers.findOne({ where: { email } });

    if (!customer) {
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json({ message: "Rider not found" });
    }

    const isValidPassword = await PasswordHarsher.compare(
      password,
      customer.password
    );

    if (!isValidPassword) {
      return res
        .status(HTTP_STATUS_CODE.CONFLICT)
        .json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      {
        userId: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
      },
      `${APP_SECRET}`,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: "Login successful",
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      token: token,
    });
  } catch (error) {
    logger.error("Error during login:", error);
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
      .json({ message: "Internal Server Error" });
  }
};

export const customerForgotPassword = async (req: Request, res: Response) => {
  try {
    let { email } = req.body;

    email = email.trim().toLowerCase();

    const user = await Customers.findOne({ where: { email } });

    if (user) {
      const longString = generateLongString(80);

      user.resetToken = longString;
      user.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24);
      await user.save();

      // Create a nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      // Compose the email content
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Reset your password",
        text: `Hi, ${user.firstName} ${user.lastName} \n\nPlease use the following link to reset your password \n\n  ${ENV.FE_BASE_URL}/reset-password?token=${longString} `,
      };

      // Send the email
      transporter.sendMail(
        mailOptions,
        (err: any, info: { response: string }) => {
          if (err) {
            console.log(err);
            return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
              message: `Failed to send reset password email. Please try again later.`,
            });
          } else {
            console.log("Email sent: " + info.response);
            return res.status(HTTP_STATUS_CODE.SUCCESS).json({
              message: `Password reset link has been sent to your email if you have an account with us.`,
            });
          }
        }
      );
    } else {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        message: `No valid user found with the provided email address.`,
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: `This is our fault, our team is working to resolve this.`,
    });
  }
};

export const customerResetPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body;
    const token = req.query.token as string;

    const user = await Customers.findOne({
      where: {
        resetToken: token,
      },
    });

    if (!user) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        message: `No reset token found for this valid user or the token has been used.`,
      });
    }

    if (new Date() > user.resetTokenExpiry) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: `Password reset token has expired.`,
      });
    }

    // Validate the new password
    try {
      validatePassword(newPassword);
    } catch (error) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: (error as Error).message,
      });
    }

    const hashedPassword = await PasswordHarsher.hash(newPassword);

    user.password = hashedPassword;
    user.resetToken = "";
    user.resetTokenExpiry = new Date(0);
    await user.save();

    return res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: `Password has been successfully reset. You can now login with your new password`,
    });
  } catch (error) {
    console.log(error);

    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: [
        { message: `This is our fault, our team is working to resolve this.` },
      ],
    });
  }
};
