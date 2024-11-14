import { Router } from "express";
import {
  createWorkflow,
//   getWorkflows,
//   getWorkflow,
//   updateWorkflow,
//   deleteWorkflow,
} from "../controllers/workflow.controller"
import { protect,protectAdmin }  from "../middlewares/auth.middleware"

const router = Router();

router.use(protect,protectAdmin);

router.post("/create", createWorkflow);
// router.get("/", getWorkflows);
// router
//   .route("/:id")
//   .get(getWorkflow)
//   .put(updateWorkflow)
//   .delete(deleteWorkflow);

export { router as workflowRoutes };
