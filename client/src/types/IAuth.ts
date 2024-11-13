export interface IGoogleAuth {
    email: string | null;
    google?: boolean;
  };

export interface ILogin{
  email :string ;
  password : string;
  recaptchaToken?:string;
}