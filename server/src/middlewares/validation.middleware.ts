import { Request, Response, NextFunction } from "express";

export const validateBody = (
  validationSchema: any,
  validateOptions = { stripUnknown: true, abortEarly: false }
) => 
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await validationSchema.validateAsync(req.body, validateOptions);
      next();
    } catch (err: any) {
      console.log("Error on validation:", err);
      next(err);
    }
  };
