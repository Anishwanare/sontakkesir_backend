import express from "express";
import {
  coordinatorRegister,
  getCoordinators,
} from "../controller/CoordinatorController.js"; // Ensure this is correctly imported

const router = express.Router();

router.post("/register", coordinatorRegister);
router.get("/fetch", getCoordinators);

export default router;
