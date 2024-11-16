import { ObjectId } from "mongoose";

export interface ITemplate extends Document {
    templateName: string;
    stepId: ObjectId;
    fields:string[];
    version: number;
    workflowId:ObjectId;
    originalId:ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
  }