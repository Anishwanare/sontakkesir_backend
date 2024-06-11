import mongoose from "mongoose";
import validator from "validator";

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Email is invalid",
    },
  },
  message: {
    type: String,
    required: true,
  },
});

export const Message = mongoose.model("Message", MessageSchema);
