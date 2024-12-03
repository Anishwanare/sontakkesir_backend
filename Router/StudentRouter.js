import express from 'express';
import { deleteStudent, editStudentData, getStudentById, getStudents, studentRegister } from '../controller/studentController.js';

const router = express.Router()

router.post("/register", studentRegister)
router.get("/get-students", getStudents);
router.put("/update/student/:id", editStudentData)
router.delete("/delete/student/:id", deleteStudent)
router.get("/getme/student/:id", getStudentById)

export default router;