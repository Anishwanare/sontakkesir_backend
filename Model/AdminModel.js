import mongoose from "mongoose";
import validator from "validator";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [2, "Name must contain at least two characters"],
      maxLength: [50, "Name must not exceed 50 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Email is invalid"],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must contain at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", adminSchema);
