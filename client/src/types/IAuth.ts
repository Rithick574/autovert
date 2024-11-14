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
  // allowedRoles: string[];
  // children?: React.ReactNode;
};