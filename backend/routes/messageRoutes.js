import express from "express";
import { sendMessage, getMessage } from "../controllers/sendMessageController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

//here protect route is a function that calles before sendMessage and it is defined by us
router.post("/send/:userid",protectRoute, sendMessage);

router.get("/:userid",protectRoute, getMessage);

export default router; 