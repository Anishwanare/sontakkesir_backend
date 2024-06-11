import express from "express";
import { deleteMessage, getAllMessages, sendMessage } from "../controller/MessageController.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/get", getAllMessages);
router.put("/delete/:id", deleteMessage);

export default router;
