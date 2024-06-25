import { School } from "../Model/SchoolModel.js";

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
  } = req.body;
  try {
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

    const newSchool = await School.create({
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

export const deleteSchool = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "School ID not found",
      });
    }

    let deleteSchool = await School.findById(id);

    if (!deleteSchool) {
      return res.status(200).json({
        status: false,
        message: "School not found",
      });
    }

    deleteSchool.deleteOne();
    return res.status(200).json({
      status: true,
      message: "School deleted successfully",
    });
  } catch (error) {
    if (error.name === "validationError") {
      const errorMessage = Object.values(err.errors)
        .map((error) => error.message || "Internal Server Error")
        .join(" ");
      return res.status(400).json({ status: false, message: errorMessage });
    }
    return res
      .status(400)
      .json({ status: false, message: "internal server error"});
  }
};
