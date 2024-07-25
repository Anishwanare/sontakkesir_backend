import { School } from "../Model/SchoolModel.js";

// School registration function
export const schoolRegistration = async (req, res, next) => {
  const {
    name,
    location,
    students,
    teachers,
    establishedYear,
    year,
    schoolId,
    password,
    schoolVillage,
    talukka,
    district,
    coordinator,
  } = req.body;

  try {
    if (
      !name ||
      !password ||
      !schoolId ||
      !schoolVillage ||
      !talukka ||
      !district ||
      !coordinator
    ) {
      return res.status(400).json({
        status: false,
        message: "Please fill all fields",
      });
    }

    const existingSchool = await School.findOne({ schoolId });
    if (existingSchool) {
      return res.status(400).json({
        status: false,
        message: "School ID already exists",
      });
    }

    const newSchool = await School.create({
      name,
      schoolId,
      password,
      schoolVillage,
      talukka,
      district,
      coordinator,
    });

    return res.status(201).json({
      status: true,
      message: "School registered successfully",
      school: newSchool,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to register school",
      error: error.message,
    });
  }
};

// Get all schools function
export const getAllSchools = async (req, res, next) => {
  try {
    const allSchools = await School.find();

    return res.status(200).json({
      status: true,
      message: "All schools fetched successfully",
      schools: allSchools,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch all schools",
      error: error.message,
    });
  }
};

// Delete school function
export const deleteSchool = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "School ID not found",
      });
    }

    const deleteSchool = await School.findById(id);

    if (!deleteSchool) {
      return res.status(404).json({
        status: false,
        message: "School not found",
      });
    }

    await School.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      message: "School deleted successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessage = Object.values(error.errors)
        .map((err) => err.message || "Internal Server Error")
        .join(" ");
      return res.status(400).json({ status: false, message: errorMessage });
    }
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
