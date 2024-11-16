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

export const editTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const existingTemplate = await templateModel.findById(id);
    if (!existingTemplate) {
      return next(ErrorResponse.notFound("Template not found"));
    }

    const newVersion = new templateModel({
      title,
      content,
      version: existingTemplate.version + 1,
      originalId: existingTemplate.originalId || existingTemplate._id,
    });

    await newVersion.save();
    res.status(200).json({
      success: true,
      data: existingTemplate,
      message: "template updated",
    });
  } catch (error) {
    next(error);
  }
};

export const getTemplateById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const template = await templateModel.findById(id);
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
