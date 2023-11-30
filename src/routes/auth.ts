import express from "express";
import authController from "../controllers/auth";
import { authenticate } from "../utils/helpers";

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.login);

export default router;
