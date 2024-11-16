import { NextFunction, Request, Response } from "express";
import { workflowModel } from "@/models/workflow.model";
import ErrorResponse from "@/middlewares/errorResponse";
import { activityLogModel } from "@/models/activity.model";
import { templateModel } from "@/models/template.model";

export const createWorkflow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { steps, description } = req.body;
    const latestWorkflow = await workflowModel
      .findOne()
      .sort({ version: -1 })
      .lean();

    if (latestWorkflow) {
      const previousVersion = latestWorkflow.version;

      if (previousVersion !== 1) {
        const previousTemplate = await templateModel.findOne({
          version: previousVersion,
        });

        if (!previousTemplate) {
          return next(
            ErrorResponse.badRequest(
              `Please complete the template for the previous version (version ${previousVersion}) before creating a new workflow.`
            )
          );
        }
      }
    }

    let newVersion = 1;
    if (latestWorkflow) {
      newVersion = latestWorkflow.version + 1;
    }
    const newWorkflow = new workflowModel({
      name: "User_Onboarding_Workflow",
      description,
      steps,
      version: newVersion,
      isActive: false,
    });

    await newWorkflow.save();

    const activityLog = new activityLogModel({
      userId: req.user?._id,
      actionType: "create",
      actionDetails: `Created a new workflow with ID: ${newWorkflow._id}`,
      entity: "workflow",
      entityId: newWorkflow._id,
    });

    await activityLog.save();

    res
      .status(201)
      .json({ success: true, data: newWorkflow, message: "workflow created" });
  } catch (error) {
    next(error);
  }
};

export const getAllworkflows = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const workflows = await workflowModel.find();
    res.status(200).json(workflows);
  } catch (error) {
    next(error);
  }
};

export const GetsingleWorkflow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const workflow = await workflowModel.findById(req.params.id);
    if (!workflow) {
      return next(ErrorResponse.notFound("Workflow not found"));
    }
    res.status(200).json(workflow);
  } catch (error) {
    next(error);
  }
};

export const updateWorkflow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { userId, name, description, steps } = req.body;

  try {
    const workflow = await workflowModel.findById(id);
    if (!workflow) {
      return next(ErrorResponse.notFound("Workflow not found"));
    }

    workflow.name = name;
    workflow.description = description;
    workflow.steps = steps;
    await workflow.save();

    const activityLog = new activityLogModel({
      userId,
      actionType: "update",
      actionDetails: `Updated workflow with ID: ${workflow._id}`,
      entity: "workflow",
      entityId: workflow._id,
    });

    await activityLog.save();

    res.status(200).json(workflow);
  } catch (error) {
    next(error);
  }
};

export const DeleteWorkFlow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const workflow = await workflowModel.findByIdAndDelete(id);
    if (!workflow) {
      return next(ErrorResponse.notFound("Workflow not found"));
    }

    const activityLog = new activityLogModel({
      userId,
      actionType: "delete",
      actionDetails: `Deleted workflow with ID: ${workflow._id}`,
      entity: "workflow",
      entityId: workflow._id,
    });

    await activityLog.save();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getLatestWorkflow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const latestWorkflow = await workflowModel
      .findOne()
      .sort({ createdAt: -1 })
      .exec();

    if (!latestWorkflow) {
      return next(ErrorResponse.notFound("No workflows found"));
    }

    res.status(200).json({
      success: true,
      data: latestWorkflow,
      message: "latest workflow retrieved",
    });
  } catch (error) {
    next(error);
  }
};
