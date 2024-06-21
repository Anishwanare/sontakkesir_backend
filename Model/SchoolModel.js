import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  schoolId: {
    type: String,
    required: true,
    trim: true,
  },
  schoolVillage: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  talukka: {
    type: String,
    required: true,
    trim: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
    trim: true,
  },
});

export const School = mongoose.model("School", schoolSchema);
