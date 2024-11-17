import ErrorResponse from "@/middlewares/errorResponse";
import { fieldModel } from "@/models/field.model";
import { templateModel } from "@/models/template.model";
import { NextFunction, Request, Response } from "express";

export const createOrUpdateField = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { _id, name, type, required, placeholder, description, options } =
      req.body;
    if (!name || !type) {
      return next(ErrorResponse.badRequest("Name and type are required"));
    }
    let responseData: any;
    if (_id) {
      const updatedField = await fieldModel.findByIdAndUpdate(
        _id,
        { name, type, required, placeholder, description, options },
        { new: true }
      );
      if (!updatedField) {
        return next(ErrorResponse.notFound("Field not found"));
      }
      responseData = updatedField;
    } else {
      const newField = {
        name,
        type,
        required,
        placeholder,
        description,
        options: options || [],
      };
      const createdFields = await fieldModel.insertMany([newField]);

      responseData = createdFields;
    }
    res.status(201).json({
      success: true,
      data: responseData,
      message: ` field created successfully`,
    });
  } catch (error) {
    next(error);
  }
};

export const getFields = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log("🚀 ~ file: field.controller.ts:61 ~ here");
  } catch (error) {
    next(error);
  }
};

export const deleteField = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { fieldId, stepId } = req.params;
    const template = await templateModel.findOne({ stepId: stepId });
    if (!template) {
      return next(ErrorResponse.notFound("stepId not found"));
    }
    template.fields = template.fields.filter(
      (field) => field.toString() !== fieldId
    );
    await template.save();
    const deletedField = await fieldModel.findByIdAndDelete(fieldId);
    if (!deletedField) {
      return next(ErrorResponse.notFound("Field not found"));
    }
    res.status(200).json({
      success: true,
      message: "Field deleted successfully",
      data: deletedField,
    });
  } catch (error) {
    next(error);
  }
};
