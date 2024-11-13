import { Router } from "express";
import {loginSchema} from "../__lib/http/validation"
import {adminLoginController} from "../controllers/auth.controller"
import { validateBody } from "@/middlewares";

const router = Router();

router.route("/admin-login").post(validateBody(loginSchema),adminLoginController);
router.route("/register").post()

export { router as authRoutes };