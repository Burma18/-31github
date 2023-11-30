import express from "express";
import userController from "../controllers/users";
import { authenticate } from "../utils/helpers";

const router = express.Router();

router.get("/", authenticate, userController.getUsers);
router.get("/:id", authenticate, userController.getUser);

export default router;
