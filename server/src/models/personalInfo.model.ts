import { IPersonalInfo } from "@/types/personalInfo.types";
import { Schema, model, Types } from "mongoose";

const personalInfoSchema = new Schema<IPersonalInfo>(
  {
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    address: {
      home: String,
      work: String,
    },
    email: { type: String, required: true },
    phoneNumbers: {
      home: String,
      mobile: String,
      work: String,
    },
    maritalStatus: {
      type: String,
      enum: ["single", "married", "divorced"],
      required: true,
    },
    userId: { type: Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);

export const personalInfoModel = model<IPersonalInfo>("PersonalInfo", personalInfoSchema);
