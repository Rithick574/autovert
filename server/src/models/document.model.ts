import { IDocument } from "@/types/documents.types";
import { Schema, model, Types } from "mongoose";

const documentSchema = new Schema<IDocument>({
  documentType: {
    type: String,
    enum: ['identification', 'birth_certificate', 'address_verification', 'education', 'professional'],
    required: true
  },
  documentSubType: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        const subTypeEnum: Record<string, string[]> = {
          identification: ['passport', 'license', 'pan_card'],
          birth_certificate: ['birth_certificate', 'age_proof'],
          address_verification: ['utility_bill', 'bank_statement'],
          education: ['transcript', 'diploma'],
          professional: ['resume', 'certifications', 'recommendation_letter']
        };
        // @ts-ignore
        return subTypeEnum[this.documentType]?.includes(value);
      },
      message: (props: any) => `${props.value} is not a valid documentSubType for the given documentType`
    }
  },
  documentUrl: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: 'Users' },
  uploadedAt: { type: Date, default: Date.now }
});

export default model<IDocument>('Document', documentSchema);
