import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`${req.originalUrl} - Not Found`);
  res.status(404).json({error,message:"API not found"});
};
