import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import ErrorResponse from "./errorResponse";

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ErrorResponse) {
    res.status(err.status).json({
      success: false,
      status: err.status,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

