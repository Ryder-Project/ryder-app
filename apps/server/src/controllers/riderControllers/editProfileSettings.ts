import { Request, Response } from "express";
import Ryder from "../../models/ryder";
import logger from "../../utilities/logger";
import { registerSchema } from "../../utilities/validators";
import { HTTP_STATUS_CODE } from "../../constants/httpStatusCode";

export const editProfile = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const userValidate = registerSchema.strict().safeParse(req.body);

  if (!userValidate.success) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: 'Invalid user data', details: userValidate.error });
  }

  const { firstName, lastName, email, phone } = userValidate.data;

  try {
    
    const user = await Ryder.findByPk(userId);

    if (!user) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ message: 'User not found' });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.email = email;

    await user.save();

    res.status(HTTP_STATUS_CODE.SUCCESS).json({ message: 'Profile updated successfully', user:{
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      userId: user.id
    } });
  } catch (error) {
    console.error(error);
    logger.error('Error updating user profile', error);
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: 'Internal server error' });
  }
};
