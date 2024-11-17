import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../middlewares/errorResponse";
import { templateModel } from "@/models/template.model";
import { workflowModel } from "@/models/workflow.model";

export const createTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, workflowId, stepId, fields } = req.body;
    const workflow = await workflowModel.findById(workflowId);
    if (!workflow) {
      return next(ErrorResponse.notFound("Workflow not found"));
    }
    const stepExists = workflow.steps.some(
      (step) => step._id.toString() === stepId
    );
    if (!stepExists) {
      return next(
        ErrorResponse.notFound("Step not found in the specified workflow")
      );
    }
    const latestTemplate = await templateModel
      .findOne({ stepId })
      .sort({ version: -1 });
    const newVersion = latestTemplate ? latestTemplate.version + 1 : 1;
    const originalId = latestTemplate
      ? latestTemplate.originalId || latestTemplate._id
      : null;

    const newTemplate = new templateModel({
      title,
      workflowId,
      stepId,
      fields,
      version: newVersion,
      originalId,
    });

    await newTemplate.save();

    res.status(201).json({
      success: true,
      data: newTemplate,
      message: "Template created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { stepId } = req.params;
    const { fields } = req.body;

    if (!fields || fields.length === 0) {
      return next(
        ErrorResponse.badRequest("No fields provided for the update.")
      );
    }
    const template = await templateModel.findOne({ stepId });
    if (!template) {
      return next(ErrorResponse.notFound("Template not found"));
    }
    const existingFieldIds = template.fields.map((field) =>
      field._id.toString()
  );
  console.log("🚀 ~ file: template.controller.ts:73 ~ existingFieldIds:", existingFieldIds)
  console.log("🚀 ~ file: template.controller.ts:79 ~ fields:", fields)
  const newFields = fields.filter(
    (field:any) => !existingFieldIds.includes(field)
  );
  
  console.log("🚀 ~ file: template.controller.ts:78 ~ newFields:", newFields)
    if (newFields.length === 0) {
      return next(ErrorResponse.badRequest("No new fields to add."));
    }

    template.fields = [...template.fields, ...newFields];

    await template.save();

    res
      .status(200)
      .json({ success: true, message: "Template updated successfully." });
  } catch (error) {
    next(error);
  }
};

export const getTemplateByStepId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { step_id } = req.params;
    const template = await templateModel
      .findOne({ stepId: step_id })
      .populate("fields");
    if (!template) {
      return next(ErrorResponse.notFound("Template not found"));
    }
    res.status(200).json({
      success: true,
      data: template,
      message: "template data retrieved",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTemplates = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const templates = await templateModel.find();
    res.status(200).json({
      success: true,
      data: templates,
      message: "All template data retrieved",
    });
  } catch (error) {
    next(error);
  }
};

export const getTemplateVersions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const versions = await templateModel.find({ originalId: id });
    res
      .status(200)
      .json({ success: true, data: versions, message: "template version" });
  } catch (error) {
    next(error);
  }
};
