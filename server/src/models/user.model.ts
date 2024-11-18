import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "@/types/user.type";

const userSchema = new Schema<IUser>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isActive: { type: Boolean, default: true },
    lastPasswordChanged: { type: Date, required: true, default: Date.now },
    onboardingData: [
      {
        workflowId: { type: Schema.Types.ObjectId, ref: "Workflow" },
        steps: [
          {
            stepName: { type: String },
            fields: [
              {
                fieldName: { type: String },
                value: { type: Schema.Types.Mixed },
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (
  password: string
): Promise<boolean> {
  console.log("password", password, this.password, this.email);
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.checkIsAdmin = function (email: string): Promise<any> {
  return this.findOne({ email });
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

export const userModel = model<IUser>("Users", userSchema);
