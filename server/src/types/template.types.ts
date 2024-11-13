
export interface ITemplate extends Document {
    templateName: string;
    content: string;
    version: number;
    createdAt?: Date;
    updatedAt?: Date;
  }