import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "admin" | "user";
  matchPassword(password: string): Promise<boolean>;
}