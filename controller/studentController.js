import { Student } from "../Model/StudentModel.js";

export const studentRegister = async (req, res, next) => {
  const {
    firstName,
    middleName,
    lastName,
    password,
    phone,
    villageName,
    talukka,
    district,
    className,
    school,
    coordinator,
  } = req.body;
  try {
    if (
      !firstName ||
      !middleName ||
      !lastName ||
      !coordinator||
      !password ||
      !className|| 
      !phone ||
      !villageName ||
      !talukka ||
      !district ||
      !school
    ) {
      return res.status(400).json({
        status: false,
        message: "Please fill all fields",
      });
    }

    //check if the student has already been registered

    const existingStudent = await Student.findOne({ phone });
    if (existingStudent) {
      return res.status(400).json({
        status: false,
        message: "Student already registered",
      });
    }

    //create a new student
    const newStudent = await Student.create({
      firstName,
      middleName,
      lastName,
      password,
      phone,
      coordinator,
      villageName,
      talukka,
      district,
      className,
      role: "Student",
      school,
    });
    return res.status(200).json({
      status: true,
      message: "Student registered successfully",
      newStudent,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const getStudents = async (req, res) => {
  const getStudent = await Student.find();
  if (!getStudent) {
    return res.status(400).json({
      status: false,
      message: "No student found",
    });
  }
  try {
    return res.status(200).json({
      status: true,
      message: "Student list fetched Successfully! ",
      getStudent,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
