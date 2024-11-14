import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../middlewares/errorResponse";
import { generateAccessToken, generateRefreshToken } from "@/__lib/http/jwt";
import { userModel } from "@/models/user.model";
import { config } from "@/__boot/config";
import axios from "axios";

export const LoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, captcha } = req.body;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${config.secrets.recaptcha_secret}&response=${captcha}`;
    const response = await axios.post(url);

    if (!response.data.success) {
      return next(ErrorResponse.badRequest("reCAPTCHA verification failed"));
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return next(ErrorResponse.unauthorized("Invalid email"));
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(ErrorResponse.unauthorized("Invalid password"));
    }
    const userData = user.toObject();
    delete userData.password;

    const accessToken = generateAccessToken({
      _id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      _id: user.id,
      email: user.email,
      role: user.role,
    });
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    res
      .status(200)
      .json({ success: true, message: "Login successful", data: userData });
  } catch (error) {
    next(error);
  }
};

export const registerAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const existes = await userModel.findOne({ email });
    if (existes) return next(ErrorResponse.conflict("admin already exists"));
    const user = new userModel({
      name,
      email,
      password,
      role: "admin",
    });

    await user.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.cookie("access_token", "", {
      maxAge: 1,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.cookie("refresh_token", "", {
      maxAge: 1,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      return next(ErrorResponse.unauthorized("Authentication required"));
    }
    const user = await userModel
      .findOne({ email: req.user.email })
      .select("-password");
    if (!user) {
      if (!user) {
        return next(ErrorResponse.notFound("User not found"));
      }
    }
    if (!user.isActive) {
      return next(ErrorResponse.forbidden("User is blocked"));
    }
    res.status(200).json({ success: true, data: user, message: "user found" });
  } catch (error) {
    next(error);
  }
};
