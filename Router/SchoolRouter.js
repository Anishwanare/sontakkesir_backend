import express from "express";
import {
  deleteSchool,
  getAllSchools,
  schoolRegistration,
} from "../controller/SchoolController.js";

const router = express.Router();

router.post("/register", schoolRegistration);
router.get("/get-schools", getAllSchools);
router.delete("/delete-school/:id", deleteSchool);

export default router;
