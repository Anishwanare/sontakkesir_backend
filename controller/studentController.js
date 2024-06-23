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
    role,
    school,
  } = req.body;
  try {
    if (
      !firstName ||
      !middleName ||
      !lastName ||
      !password ||
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

    const existingStudent = await Student.findOne({phone});
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
      villageName,
      talukka,
      district,
      role: "Student",
      school
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
