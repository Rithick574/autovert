import { IActivity } from "@/types/activity.type";
import { Schema, model,Types } from "mongoose";

const activityLogSchema = new Schema<IActivity>(
  {
    userId: { type: Types.ObjectId, ref: "Users" },
    actionType: {
      type: String,
      enum: ["create", "update", "delete", "approve"],
      required: true,
    },
    actionDetails: { type: String },
    entity: {
      type: String,
      enum: ["workflow", "template", "document"],
      required: true,
    },
    entityId: { type: Types.ObjectId, refPath: "entity" },
  },
  { timestamps: true }
);

export const activityLogModel = model<IActivity>("ActivityLog", activityLogSchema);
