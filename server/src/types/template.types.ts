import { ObjectId } from "mongoose";

interface IField {
  _id: ObjectId; 
}

export interface ITemplate extends Document {
  title: string;
  stepId: ObjectId;
  fields: IField[];
  version: number;
  workflowId: ObjectId;
  originalId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
