import mongoose from "mongoose";
import validator from "validator";

const coordinatorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  role: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Please provide a valid email",
    },
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  school: {
    type: String,
    required: [false, "School is not required"],
  },
  district: {
    type: String,
    required: [true, "District is required"],
  },
  talukka: {
    type: String,
    required: [true, "Taluka is required"],
  },
  password: {
    type: String,
    required: true,
  },
});

export const Coordinator = mongoose.model("Coordinator", coordinatorSchema);
