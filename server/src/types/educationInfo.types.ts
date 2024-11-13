import { ObjectId } from "mongoose";

export interface IEducationalInfo extends Document {
    highestEducation: string;
    institutionName: string;
    gpa?: number; 
    degree?: string; 
    completionDate?: Date; 
    fieldOfStudy?: string; 
    userId: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
  }