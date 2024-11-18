import { Document, ObjectId } from "mongoose";

interface IField {
  fieldName: string;
  value: any;
}

interface IStep {
  stepName: string;
  fields: IField[];
}

export interface IOnboardingStep {
  workflowId: ObjectId;
  steps: IStep[];
}

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  role: "admin" | "user";
  lastPasswordChanged: Date;
  isActive: true;
  createdAt?: Date;
  updatedAt?: Date;
  onboardingData?: IOnboardingStep[];
  matchPassword(password: string): Promise<boolean>;
  checkIsadmin(email: String): Promise<any>;
}
