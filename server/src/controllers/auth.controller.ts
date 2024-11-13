import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../middlewares/errorResponse";
import { generateAccessToken, generateRefreshToken } from "@/__lib/http/jwt";
import { adminModel } from "@/models/admin.model";

export const adminLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {email,password} = req.body;
    
    const user = await adminModel.findOne(email);
    if (!user) {
        return next(ErrorResponse.unauthorized("Invalid email"));
      }
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
      sameSite: "strict",
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res
      .status(200)
      .json({ success: true, message: "Login successful", data: user });
  } catch (error) {
    next(error);
  }
};
