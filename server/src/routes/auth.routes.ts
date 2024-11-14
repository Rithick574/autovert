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

router.post("/register-admin", registerAdmin);
router
  .route("/")
  .post(validateBody(loginSchema), LoginController)
  .delete(logout)
  .get(protect, getUser);
router.route("/register").post();

export { router as authRoutes };
