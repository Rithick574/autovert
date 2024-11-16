import ErrorResponse from "@/middlewares/errorResponse";
import { fieldModel } from "@/models/field.model";
import { NextFunction, Request, Response } from "express";

export const createFields = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { fields } = req.body;
    if (!Array.isArray(fields) || fields.length === 0) {
      return next(
        ErrorResponse.notFound("Fields must be an array and cannot be empty")
      );
    }
    for (const field of fields) {
      if (!field.name || !field.type) {
        return next(
          ErrorResponse.badRequest("Each field must have a name and type")
        );
      }
      if (
        !["text", "number", "date", "email", "select", "textarea"].includes(
          field.type
        )
      ) {
        return next(
          ErrorResponse.badRequest(`Invalid field type: ${field.type}`)
        );
      }
    }
    const createdFields = await fieldModel.insertMany(fields);

    res.status(201).json({
      success: true,
      data: createdFields,
      message: `${createdFields.length} fields created successfully`,
    });
  } catch (error) {
    next(error);
  }
};
