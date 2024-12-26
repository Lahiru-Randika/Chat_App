import express from "express";
import { loginUser, logoutUser, signinUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/signin",signinUser)

router.post("/login",loginUser)

router.post("/logout",logoutUser)

export default router;