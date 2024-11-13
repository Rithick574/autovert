import { Document, ObjectId } from "mongoose";

export interface IActivity extends Document {
  userId: ObjectId;
  actionType: "create" | "update" | "delete" | "approve";
  actionDetails: string;
  entity: "workflow" | "template" | "document";
  entityId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
