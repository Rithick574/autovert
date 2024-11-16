import { Schema, Types, model } from "mongoose";
import { ITemplate } from "@/types/template.types";

const templateSchema = new Schema<ITemplate>(
  {
    title: { type: String, required: true },
    workflowId: {
      type: Schema.Types.ObjectId,
      ref: "Workflow",
      required: true,
    },
    stepId: { type: Schema.Types.ObjectId, required: true },
    fields: [{ type: Schema.Types.ObjectId, ref: "Field", required: true }],
    originalId: { type: Types.ObjectId, ref: "Template" },
    version: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);  


export const templateModel = model<ITemplate>("Template", templateSchema);
