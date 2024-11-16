import { Document, ObjectId } from "mongoose";

export interface IOnboardingField {
  fieldId: ObjectId;
  value: any;
}

export interface IOnboardingStep {
  workflowId: ObjectId;
  stepId: ObjectId;
  fields: IOnboardingField[];
}

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "admin" | "user";
  lastPasswordChanged: Date;
  version: number;
  isActive: true;
  createdAt?: Date;
  updatedAt?: Date;
  onboardingData?: IOnboardingStep[];
  matchPassword(password: string): Promise<boolean>;
  checkIsadmin(email: String): Promise<any>;
}
