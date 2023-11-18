import userRoutes from "./users";
import authRoutes from "./auth";
import express from "express";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;
