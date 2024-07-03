import { Admin } from "../Model/AdminModel.js";
import jwt from "jsonwebtoken";

export const AdminRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if ((!email, !name, !password)) {
      return res.status(400).json({
        status: false,
        message: "Please fill all fields",
      });
    }
    // check if email already exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({
        status: false,
        message: "Email already exists",
      });
    }
    // create new user
    const newAdmin = await Admin.create({
      name,
      email,
      password,
      role: "Admin",
    });
    return res.status(200).json({
      status: true,
      message: "Admin registered successfully",
      newAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong, please try again!",
      error: error.message, // Send error message for debugging
    });
  }
};

export const AdminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please fill all fields",
      });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY);

    return res.status(200).json({
      status: true,
      message: "Logged in successfully",
      admin,
      token,
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong, please try again!",
    });
  }
};

export const AdminGetProfile = async (req, res, next) => {
  try {
    const admin = await Admin.find({});
    if (!admin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Admin profile fetched successfully",
      admin,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong, please try again!",
      error: error.message, // Send error message for debugging
    });
  }
};
