import { createFields } from "@/controllers/field.controller";
import { Router } from "express";

const router = Router();

router.route('/').post(createFields);



export {router as fieldRoutes}