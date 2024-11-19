export interface IGoogleAuth {
    email: string | null;
    google?: boolean;
  };

export interface ILogin{
  email :string ;
  password : string;
  recaptchaToken?:string;
}


export type ProtectedRouteProps = {
  element: React.ReactNode;
};

interface Field {
  fieldName: string;
  value: string;
  _id: string;
}

interface Step {
  stepName: string;
  fields: Field[];
  _id: string;
}

interface OnboardingData {
  workflowId: string;
  steps: Step[];
  _id: string;
}

export interface IUser {
  firstname: string;
  email: string;
  createdAt:string;
  onboardingData: OnboardingData[];
}