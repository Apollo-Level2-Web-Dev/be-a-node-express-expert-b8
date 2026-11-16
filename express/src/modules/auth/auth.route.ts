import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();
// /api/v1/auth/login

router.post("/login",authController.loginUser)

router.post("/refresh-token", authController.generateToken)


export const authRoute = router;
