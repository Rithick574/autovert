import { IField } from "@/types/field.types";
import { Schema, model } from "mongoose";

const fieldSchema = new Schema<IField>(
  {
    fieldName: { type: String, required: true },
    fieldType: {
      type: String,
      enum: ["text", "number", "date", "email"],
      required: true,
    },
    isRequired: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model<IField>("Field", fieldSchema);
