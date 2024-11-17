import { IField } from "@/types/field.types";
import { Schema, model } from "mongoose";

const fieldSchema = new Schema<IField>(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["text", "number", "date", "email", "select", "textarea", "file"],
      required: true,
    },
    required: { type: Boolean, default: false },
    placeholder: { type: String },
    description: { type: String },
    options: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const fieldModel = model<IField>("Field", fieldSchema);
