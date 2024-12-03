import mongoose from "mongoose";
import validator from "validator";

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Check if the phone number is a valid Indian phone number
          return /^[6-9]\d{9}$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid Indian phone number!`,
      },
    },
    school: {
      type: String,
      required: true,
    },
    coordinator: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    villageName: {
      type: String,
      required: true,
    },
    talukka: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
