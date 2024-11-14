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
        stepName: String,
        stepType: {
          type: String,
          enum: ["action", "approval", "notification"],
        },
        nextStep: { type: Schema.Types.ObjectId, ref: "Step" },
      },
    ],
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

workflowSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    this.version += 1;
    next();
  });

export const workflowModel = model<IWorkflow>("Workflow", workflowSchema);
