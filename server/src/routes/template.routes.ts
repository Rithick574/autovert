import { Router } from "express";
import {
  createTemplate,
  editTemplate,
  getAllTemplates,
  getTemplateById,
  getTemplateVersions,
} from "@/controllers/template.controller";

const router = Router();

router
  .route("/")
  .post(createTemplate)
  .put(editTemplate)
  .get(getAllTemplates);

router.get('/:id',getTemplateById)
router.get('/:version',getTemplateVersions)                 

export { router as templateRoutes };
