import { Document } from "mongoose";

export interface IUser extends Document {
  name:string;
  email: string;
  password: string;
  role: "admin" | "user";
  lastPasswordChanged:Date;
  version:number;
  isActive:true;
  createdAt:Date;
  updatedAt:Date;
  matchPassword(password: string): Promise<boolean>;
  checkIsadmin(email: String): Promise<any>;
}