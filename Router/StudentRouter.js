import express from 'express';
import { getStudents, studentRegister } from '../controller/studentController.js';

const router = express.Router()

router.post("/register",studentRegister)
router.get("/get-students", getStudents);

export default router;