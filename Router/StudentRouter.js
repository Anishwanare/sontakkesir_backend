import express from 'express';
import { studentRegister } from '../controller/studentController.js';

const router = express.Router()

router.post("/register",studentRegister)

export default router;