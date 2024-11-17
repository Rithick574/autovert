export interface IField extends Document {
  name: string;
  type: "text" | "number" | "date" | "email" | "select" | "textarea" | "file";
  required?: boolean;
  placeholder?: string;
  validation?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  options?: [];
  fileTypes?: string[];
  maxSize?: number;
}
