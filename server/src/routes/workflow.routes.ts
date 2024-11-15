import { Router } from "express";
import {
  createWorkflow,
  getAllworkflows,
  GetsingleWorkflow,
  updateWorkflow,
  DeleteWorkFlow,
  getLatestWorkflow,
} from "../controllers/workflow.controller";
import { protect, protectAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.use(protect, protectAdmin);

router.get("/latest", getLatestWorkflow);
router.route("/").post(createWorkflow).get(getAllworkflows);
router
  .route("/:id")
  .get(GetsingleWorkflow)
  .put(updateWorkflow)
  .delete(DeleteWorkFlow);

  
export { router as workflowRoutes };
