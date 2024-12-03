import express from "express";
import {
  deleteSchool,
  editSchool,
  getAllSchools,
  getSchoolById,
  schoolRegistration,
} from "../controller/SchoolController.js";

const router = express.Router();

router.post("/register", schoolRegistration);
router.get("/get-schools", getAllSchools);
router.put("/edit-school/:id", editSchool); // Edit school route
router.delete("/delete-school/:id", deleteSchool);
router.get("/get-school/:id", getSchoolById);

export default router;
