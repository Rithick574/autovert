import { Router } from "express";
import { loginSchema } from "../__lib/http/validation";
import {
  LoginController,
  registerAdmin,
  getUser,
  logout,
} from "../controllers/auth.controller";
import { protect, validateBody } from "@/middlewares";

const router = Router();

router
.route("/")
.post(validateBody(loginSchema), LoginController)
.delete(logout)
.get(protect, getUser);
router.route("/register").post();
router.post("/register-admin", registerAdmin);

export { router as authRoutes };
