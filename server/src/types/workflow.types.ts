import { ObjectId } from "mongoose";

interface IWorkflowStep {
    stepName?: string;
    stepType?: "action" | "approval" | "notification";
    assignedTo?: ObjectId;
    conditions?: Record<string, any>;
    nextStep?: ObjectId;
  }
  
  
export interface IWorkflow extends Document {
    name: string;
    type: "sequential" | "parallel" | "conditional";
    steps: IWorkflowStep[];
    description:string;
    version: number;
    createdAt?: Date;
    updatedAt?: Date;
  }