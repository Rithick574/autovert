import { Schema, model } from "mongoose";
import { ITemplate } from "@/types/template.types";

const templateSchema = new Schema<ITemplate>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

templateSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  this.version += 1;
  next();
});

export const templateModel = model<ITemplate>("Template", templateSchema);
