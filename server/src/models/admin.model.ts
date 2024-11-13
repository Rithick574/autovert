import { Schema,model } from "mongoose";

const adminSchema = new Schema({
  email: { type: String, required: true },
  password: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ["admin", "user"],
    },
  },
});


export const adminModel = model("Users", adminSchema);