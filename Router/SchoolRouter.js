import express from "express";
import { getAllSchools, schoolRegistration } from "../controller/SchoolController.js";

const router = express.Router();

router.post("/register", schoolRegistration);
router.get("/get-schools", getAllSchools);

export default router;