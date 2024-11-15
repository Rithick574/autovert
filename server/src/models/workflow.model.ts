import { IWorkflow } from "@/types/workflow.types";
import { Schema, model } from "mongoose";

const workflowSchema = new Schema<IWorkflow>(
  {
    name: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      enum: ["sequential", "parallel", "conditional"],
      default: "sequential",
    },
    steps: [
      {
        id: String,
        stepName: String,
        stepType: String,
      },
    ],
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const workflowModel = model<IWorkflow>("Workflow", workflowSchema);
