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
    isActive: { type: Boolean, default: false },
    steps: [
      {
        title: { type: String, required: true },
        order: {
          type: Number,
          required: true,
          validate: {
            validator: Number.isInteger,
            message: "Order must be an integer.",
          },
        },
      },
    ],
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const workflowModel = model<IWorkflow>("Workflow", workflowSchema);
