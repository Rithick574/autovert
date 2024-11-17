import { createOrUpdateField,deleteField } from "@/controllers/field.controller";
import { Router } from "express";

const router = Router();

router.route('/').post(createOrUpdateField);
router.route("/:fieldId/:stepId").delete(deleteField)



export {router as fieldRoutes}