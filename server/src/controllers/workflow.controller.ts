import { NextFunction, Request, Response } from "express";
// import ErrorResponse from "../middlewares/errorResponse";
import {workflowModel} from "@/models/workflow.model"

export const createWorkflow = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
        const { name, type, steps, description } = req.body;
    const newWorkflow = new workflowModel({
      name,
      type,
      steps,
      description,
    });
    await newWorkflow.save();
    res.status(201).json({success:true,data:newWorkflow,message:"workflow created"});
    } catch (error) {
        next(error);
    }
  }