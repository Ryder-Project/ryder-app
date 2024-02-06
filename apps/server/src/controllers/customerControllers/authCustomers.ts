import { Request, Response } from "express";
import { Op } from "sequelize";
import { v4 as uuidV4 } from "uuid";
import { HTTP_STATUS_CODE } from "../../constants/httpStatusCode";
import { passwordUtils, PasswordHarsher } from "../../utilities/helpers";
import logger from "../../utilities/logger";
import { customerRegisterSchema } from "../../utilities/validators";
import Customers from "../../models/customers";
import { APP_SECRET } from "../../config/env";
import * as jwt from "jsonwebtoken";

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

export const login = async (req: Request, res: Response) => {
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

    const token = jwt.sign({ userId: customer.id }, `${APP_SECRET}`, {
      expiresIn: "1d",
    });

    res.cookie("userId", customer.id, { httpOnly: true, secure: true });
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.cookie("firstName", customer.firstName, {
      httpOnly: true,
      secure: true,
    });
    res.cookie("lastName", customer.lastName, { httpOnly: true, secure: true });
    res.cookie("phone", customer.phone, { httpOnly: true, secure: true });
    res.cookie("email", customer.email, { httpOnly: true, secure: true });
    res.cookie("verified", customer.isVerified, {
      httpOnly: true,
      secure: true,
    });

    res
      .status(HTTP_STATUS_CODE.SUCCESS)
      .json({ message: "Login successful", userId: customer.id, token: token });
  } catch (error) {
    logger.error("Error during login:", error);
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
      .json({ message: "Internal Server Error" });
  }
};
