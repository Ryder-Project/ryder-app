import { ENV } from "../config";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const passwordUtils = {
  length: 5,
  regex: ENV.IS_PROD
    ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{5,}$/
    : /^[A-Za-z0-9]{5,}$/,
  error: ENV.IS_PROD
    ? `Password: Min 5 characters, with an uppercase, a lowercase, a number, and a special character.`
    : "Password: Min 5 characters, uppercase or lowercase.",
};

export class PasswordHarsher {
  static async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  static async hash(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
