import { ENV } from "../config";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const passwordUtils = {
  len: 8,
  regex: ENV.IS_PROD
    ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,}$/
    : /^[A-Za-z0-9]{8,}$/,
  error: ENV.IS_PROD
    ? `Pw: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 special char.`
    : "Pw: Min 8 chars, uppercase or lowercase.",
};

export const passwordUtilsDev = {
  len: 8,
  regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,}$/,
  error: `Pw: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 special char.`,
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
