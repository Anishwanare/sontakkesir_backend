import { School } from "../Model/SchoolModel.js";

export const schoolRegistration = async (req, res, next) => {
  try {
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
    } = req.body;

    if (
      !name ||
      !location ||
      !password ||
      !schoolId ||
      !schoolVillage ||
      !talukka ||
      !district
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

    const newSchool = new School({
      name,
      location,
      students,
      teachers,
      establishedYear,
      year,
      schoolId,
      schoolVillage,
      talukka,
      district,
    });

    await newSchool.save();

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
