import { ObjectId } from "mongoose";

export interface IProfessionalInfo extends Document {
    employer: string;
    jobTitle: string;
    startDate: Date;
    endDate?: Date; 
    responsibilities?: string; 
    industry?: string; 
    userId: ObjectId;
    createdAt?: Date;
    updatedAt?:Date;
  }