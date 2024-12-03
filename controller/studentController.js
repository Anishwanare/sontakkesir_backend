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
      !coordinator ||
      !password ||
      !className ||
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

export const editStudentData = async (req, res, next) => {
  const { id } = req.params
  const { firstName, lastName, password, phone, coordinator, villageName, talukka, district, className, school } = req.body

  try {
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "No id provided"
      })
    }
    const student = await Student.findById(id)
    if (!student) {
      return res.status(400).json({
        status: false,
        message: "No student found"
      })
    }
    if (firstName) student.firstName = firstName
    if (lastName) student.lastName = lastName
    if (password) student.password = password
    if (phone) student.phone = phone
    if (coordinator) student.coordinator = coordinator
    if (villageName) student.villageName = villageName
    if (talukka) student.talukka = talukka
    if (district) student.district = district
    if (className) student.className = className
    if (school) student.school = school

    await student.save({ validateBeforeSave: true, runValidators: true, new: true })

    res.status(200).json({
      status: true,
      message: "Student data updated successfully",
      student
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message
    })
  }
}

export const deleteStudent = async (req, res, next) => {
  const { id } = req.params
  const deleteStudent = await Student.findByIdAndDelete(id)
  if (!deleteStudent) {
    return res.status(400).json({
      status: false,
      message: "No student found"
    })
  }
  res.status(200).json({
    status: true,
    message: "Student deleted successfully",
    deleteStudent
  })
}

export const getStudentById = async(req,res,next)=>{
  const {id} = req.params
  const getStudent = await Student.findById(id)
  if (!getStudent) {
    return res.status(400).json({
      status: false,
      message: "No student found",
      getStudent
    })
  }
  res.status(200).json({
    status: true,
    message: "Student fetched successfully",
    getStudent
  })
}