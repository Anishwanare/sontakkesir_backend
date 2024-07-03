import express from 'express';
import { AdminGetProfile, AdminLogin, AdminRegister } from '../controller/AdminController.js';

const router = express.Router();

router.post("/register",AdminRegister)
router.post("/login",AdminLogin)
router.get("/fetch", AdminGetProfile);

export default router;