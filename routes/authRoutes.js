import express from "express";
import { signUp, signIn, profile, logout } from "../controller/authController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const  router = express.Router();

router.post("/register", signUp);
router.post("/login", signIn)
router.get("/profile", authMiddleware, profile)
router.post("/logout", logout)

export default router;
