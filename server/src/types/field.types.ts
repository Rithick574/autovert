export interface IField extends Document {
    fieldName: string;
    fieldType: "text" | "number" | "date" | "email";
    isRequired: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }