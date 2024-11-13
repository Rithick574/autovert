import * as Yup from 'yup';
import * as z from "zod";

export const validationSchema = z
  .object({
    firstname: z
      .string()
      .trim()
      .regex(/^[a-zA-Z]+$/, "First name must contain only letters")
      .min(1, "First name is required"),
    lastname: z
      .string()
      .trim()
      .regex(/^[a-zA-Z]+$/, "Last name must contain only letters")
      .min(1, "Last name is required"),
    email: z
      .string()
      .trim()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .min(1, "Password is required"),
    confirmPassword: z.string().trim().min(1, "Confirm password is required"),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords must match",
      });
    }
  });


  export const AdminvalidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    captcha: Yup.string().required('Please complete the captcha verification')
  });
  
