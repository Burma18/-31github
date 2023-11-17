import userRoutes from "./users";
import express from "express";

const router = express.Router();

router.use("/users", userRoutes);

export default router;
