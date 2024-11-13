import { IEducationalInfo } from "@/types/educationInfo.types";
import { Schema, model, Types } from "mongoose";

const educationalInfoSchema = new Schema<IEducationalInfo>(
  {
    highestEducation: { type: String, required: true },
    institutionName: { type: String, required: true },
    gpa: { type: Number },
    degree: { type: String },
    completionDate: { type: Date },
    fieldOfStudy: { type: String },
    userId: { type: Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);

module.exports = model<IEducationalInfo>(
  "EducationalInfo",
  educationalInfoSchema
);
