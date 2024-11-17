import { Router } from "express";
import {
  createTemplate,
  updateTemplate,
  getAllTemplates,
  getTemplateByStepId,
  getTemplateVersions,
} from "@/controllers/template.controller";

const router = Router();

router.route("/").post(createTemplate).get(getAllTemplates);
router.post("/:stepId", updateTemplate);
router.get("/:step_id", getTemplateByStepId);
router.get("/:version", getTemplateVersions);

export { router as templateRoutes };
