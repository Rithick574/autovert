import { Router } from "express";
import {
  getActiveLatestWorkflow,
  getWorkflowSteps,
  saveOnboardingData,
} from "@/controllers/onboarding.controller";
import { protect } from "@/middlewares";

const router = Router();

router.post("/", protect, saveOnboardingData);
router.get("/active-latest", getActiveLatestWorkflow);
router.get("/:workflowId", getWorkflowSteps);

export { router as onboardingRoutes };
