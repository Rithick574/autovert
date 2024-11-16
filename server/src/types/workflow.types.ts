import { ObjectId } from "mongoose";

interface IWorkflowStep {
  _id: ObjectId;
  title?: string;
  order?: number;
}

export interface IWorkflow extends Document {
  name: string;
  description: string;
  type: "sequential" | "parallel" | "conditional";
  isActive: boolean;
  steps: IWorkflowStep[];
  version: number;
  createdAt?: Date;
  updatedAt?: Date;
}
