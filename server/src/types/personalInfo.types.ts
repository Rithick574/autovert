import { ObjectId } from "mongoose";

interface IAddress {
    home?: string;
    work?: string;
  }
  
  interface IPhoneNumbers {
    home?: string;
    mobile?: string;
    work?: string;
  }
  
export interface IPersonalInfo extends Document {
    fullName: string;
    dateOfBirth: Date;
    gender: "male" | "female" | "other";
    address?: IAddress;
    email: string;
    phoneNumbers?: IPhoneNumbers;
    maritalStatus: "single" | "married" | "divorced";
    userId: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
  }