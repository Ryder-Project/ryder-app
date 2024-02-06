import { Request, Response } from "express";
import { Op } from "sequelize";
import { v4 as uuidV4 } from "uuid";
import { HTTP_STATUS_CODE } from "../../constants/httpStatusCode";
import { passwordUtils, PasswordHarsher } from "../../utilities/helpers";
import logger from "../../utilities/logger";
import { registerSchema } from "../../utilities/validators";
import Ryder from "../../models/ryder";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { APP_SECRET } from "../../config/env";
import { v2 as cloudinary } from "cloudinary";

export const registerRyder = async (req: Request, res: Response) => {
  const passwordRegex = passwordUtils.regex;
  try {
    const userValidate = registerSchema.strict().safeParse(req.body);

    if (userValidate.success) {
      const { firstName, lastName, email, phone, city, password } = userValidate.data;
      const newEmail = email.trim().toLowerCase();

      if (!passwordRegex.test(password)) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
          message: passwordUtils.error,
        });
      }
      const userExist = await Ryder.findOne({
        where: {
          [Op.or]: [{ email: newEmail }, { phone: phone }],
        },
      });
      if (!userExist) {
        const hashedPassword = await PasswordHarsher.hash(password);
        const id = uuidV4();
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        let bikeDoc = ''
        let validIdCard = ''
        let passportPhoto = ''

        if (req.files) {
          // Upload image to Cloudinary
          const bikeDocResult = await cloudinary.uploader.upload(
            files['bikeDoc'][0].buffer.toString('base64')
          )
          bikeDoc = bikeDocResult.secure_url

          const validIdCardResult = await cloudinary.uploader.upload(
            files['bikeDoc'][0].buffer.toString('base64')
          )
          validIdCard = validIdCardResult.secure_url

          const passportPhotoResult = await cloudinary.uploader.upload(
            files['bikeDoc'][0].buffer.toString('base64')
          )
          passportPhoto = passportPhotoResult.secure_url
        }

        const user = await Ryder.create({
          id,
          firstName,
          lastName,
          email: newEmail,
          city,
          phone,
          password: hashedPassword,
          bikeDoc: bikeDoc,
          validIdCard: validIdCard,
          passportPhoto: passportPhoto,
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
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: 'Email and password are required' });
  }

  try {
    const rider = await Ryder.findOne({ where: { email } });

    if (!rider) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ message: 'Rider not found' });
    }

    const isValidPassword = await bcrypt.compare(password, rider.password);

    if (!isValidPassword) {
      return res.status(HTTP_STATUS_CODE.CONFLICT).json({ message: 'Wrong password' });
    }

    const token = jwt.sign({ userId: rider.id, firstName: rider.firstName, 
      lastName: rider.lastName, email: rider.email, phone: rider.phone }, `${APP_SECRET}`, {
      expiresIn: '1d', 
    });

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: false });
    
    res.status(HTTP_STATUS_CODE.SUCCESS).json({
       message: 'You have successfully logged in',
       token: token
      });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: 'Internal Server Error' });
  }
};
     
  
    
