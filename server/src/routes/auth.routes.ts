import { Router } from "express";
import {loginSchema} from "../__lib/http/validation"
import {LoginController} from "../controllers/auth.controller"
import { validateBody } from "@/middlewares";

const router = Router();

router.route("/login").post(validateBody(loginSchema),LoginController);
router.route("/register").post()

export { router as authRoutes };