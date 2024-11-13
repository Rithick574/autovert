import { IProfessionalInfo } from "@/types/professionalinfo.types";
import { Schema, model,Types } from "mongoose";

const professionalInfoSchema = new Schema<IProfessionalInfo>({
  employer: { type: String, required: true },
  jobTitle: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  responsibilities: { type: String },
  industry: { type: String },
  userId: { type: Types.ObjectId, ref: 'Users' }, 
},
{timestamps:true}
);

module.exports = model<IProfessionalInfo>('ProfessionalInfo', professionalInfoSchema);
