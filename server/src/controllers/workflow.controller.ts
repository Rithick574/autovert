import { NextFunction, Request, Response } from "express";
import { workflowModel } from "@/models/workflow.model";
import ErrorResponse from "@/middlewares/errorResponse";
import { activityLogModel } from "@/models/activity.model";

export const createWorkflow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, steps, description } = req.body;
    const latestWorkflow = await workflowModel
      .findOne({ name })
      .sort({ version: -1 })
      .lean();

    let newVersion = 1;
    if (latestWorkflow) {
      newVersion = latestWorkflow.version + 1;
    }
    const newWorkflow = new workflowModel({
      name,
      description,
      steps,
      version: newVersion,
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
    console.log("fghbjn");
    
    const latestWorkflow = await workflowModel.findOne()
      .sort({ createdAt: -1 })
      .exec();

    if (!latestWorkflow) {
      return next(ErrorResponse.notFound("No workflows found"));
    }

    res
      .status(200)
      .json({
        success: true,
        data: latestWorkflow,
        message: "latest workflow retrieved",
      });
  } catch (error) {
    next(error);
  }
};
