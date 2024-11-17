export interface IField {
    _id?:string;
    name: string;
    type: string;
    required?: boolean;
    placeholder?: string;
    description?: string;
    options?: string[];
  }