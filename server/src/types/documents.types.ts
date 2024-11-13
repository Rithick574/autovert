import { ObjectId } from "mongoose";

type DocumentType = 
  | 'identification'
  | 'birth_certificate'
  | 'address_verification'
  | 'education'
  | 'professional';

type DocumentSubType = 
  | 'passport'
  | 'license'
  | 'pan_card'
  | 'birth_certificate'
  | 'age_proof'
  | 'utility_bill'
  | 'bank_statement'
  | 'transcript'
  | 'diploma'
  | 'resume'
  | 'certifications'
  | 'recommendation_letter';

export interface IDocument extends Document {
    documentType: DocumentType;
    documentSubType: DocumentSubType;
    documentUrl: string;
    userId: ObjectId;
    uploadedAt: Date;
  }