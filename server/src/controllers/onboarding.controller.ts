import ErrorResponse from "@/middlewares/errorResponse";
import { templateModel } from "@/models/template.model";
import { userModel } from "@/models/user.model";
import { workflowModel } from "@/models/workflow.model";
import { NextFunction, Request, Response } from "express";


export const getActiveLatestWorkflow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const activeWorkflow = await workflowModel
      .findOne({ isActive: true })
      .sort({ createdAt: -1 })
      .select("steps");
    if (!activeWorkflow) {
      return next(ErrorResponse.notFound("No active workflow found"));
    }
    res.status(200).json({
      success: true,
      data: activeWorkflow,
      message: "retrieved latest active workflow",
    });
  } catch (error) {
    next(error);
  }
};

export const saveOnboardingData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { workflowId, steps } = req.body;

    if (!workflowId || !steps || !Array.isArray(steps)) {
      return next(
        ErrorResponse.badRequest(
          "Invalid request. Ensure workflowId and steps are provided."
        )
      );
    }

    const user = await userModel.findById(userId);
    if (!user) return next(ErrorResponse.notFound("User not found"));

    const existingWorkflow = user.onboardingData?.find(
      (workflow) => workflow.workflowId.toString() === workflowId
    );

    if (existingWorkflow) {
      return next(
        ErrorResponse.forbidden(
          "Onboarding data for this workflow has already been submitted. Editing or resubmitting is not allowed."
        )
      );
    }
    const newWorkflow = {
      workflowId,
      steps: steps.map((step: any) => ({
        stepName: step.stepName,
        fields: step.fields.map((field: any) => ({
          fieldName: field.fieldName,
          value: field.value,
        })),
      })),
    };

    user.onboardingData = user.onboardingData || [];
    user.onboardingData.push(newWorkflow);

    await user.save();
    res.status(200).json({
      success: true,
      message: "Onboarding data saved successfully",
      data: user.onboardingData,
    });
  } catch (error) {
    next(error);
  }
};

export const getWorkflowSteps = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { workflowId } = req.params;
    const workflow = await workflowModel.findById(workflowId).lean();
    if (!workflow) {
      return next(ErrorResponse.notFound("Workflow not found"));
    }
    const templates = await templateModel
      .find({ workflowId })
      .populate("fields")
      .lean();

    const steps = workflow.steps.map((step) => {
      const stepTemplates = templates.filter(
        (template) => template.stepId.toString() === step._id.toString()
      );

      const fields = stepTemplates.flatMap((template) =>
        template.fields.map((field: any) => ({
          name: field.name,
          type: field.type,
          placeholder: field?.placeholder,
          options: field?.options,
          required: field?.required,
        }))
      );
      return {
        step: step.order,
        title: step.title,
        fields,
      };
    });
    res.status(200).json({ success: true, data: steps });
  } catch (error) {
    next(error);
  }
};

