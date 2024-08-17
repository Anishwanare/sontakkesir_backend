import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  headMasterName: {
    type: String,
    required: true,
    unique: true,
  },
  headMasterMobile: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  schoolId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  schoolVillage: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: false,
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
  coordinator: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: false,
    trim: true,
  },
}, { timestamps: true });

export const School = mongoose.model("School", schoolSchema);
