import express from "express";
import { config } from "dotenv";
import cors from "cors";
import MessageRouter from "./Router/MessageRouter.js";
import SchoolRouter from "./Router/SchoolRouter.js";
import StudentRouter from "./Router/StudentRouter.js";
import { dbConnection } from "./DataBase/dbConnection.js";

export const app = express();

config({ path: "./config/config.env" });
dbConnection();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

//
app.use("/api/v1/message", MessageRouter);
app.use("/api/v2/school", SchoolRouter);
app.use("/api/v3/student",StudentRouter);
