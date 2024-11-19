import { Router } from "express";
import { loginSchema } from "../__lib/http/validation";
import {
  LoginController,
  registerAdmin,
  getUser,
  logout,
  registerUser,
  getUserApplications,
  getUserById
} from "../controllers/auth.controller";
import { protect, validateBody } from "@/middlewares";

const router = Router();

router
.route("/")
.post(validateBody(loginSchema), LoginController)
.delete(logout)
.get(protect, getUser);
router.route("/register").post(registerUser);
router.post("/register-admin", registerAdmin);
router.get("/applications",getUserApplications);
router.get("/applications/:userId",getUserById);


export { router as authRoutes };
