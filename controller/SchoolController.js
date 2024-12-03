import { School } from "../Model/SchoolModel.js";
import { Student } from "../Model/StudentModel.js";

// School registration function
export const schoolRegistration = async (req, res, next) => {
  const {
    name,
    schoolId,
    password,
    schoolVillage,
    talukka,
    district,
    coordinator,
    headMasterName,
    headMasterMobile
  } = req.body;

  try {
    if (
      !name ||
      !password ||
      !schoolId ||
      !schoolVillage ||
      !talukka ||
      !district ||
      !coordinator ||
      !headMasterName ||
      !headMasterMobile
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
      headMasterName,
      headMasterMobile
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
  const { id } = req.params; // School ID to be deleted

  try {
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "School ID not provided",
      });
    }

    // Find the school by its ID
    const schoolToDelete = await School.findById(id);

    if (!schoolToDelete) {
      return res.status(404).json({
        status: false,
        message: "School not found",
      });
    }

    // Check if any students are assigned to this school name
    const studentsAssigned = await Student.find({ school: schoolToDelete.name }); // Use the school name for comparison

    if (studentsAssigned.length > 0) {
      return res.status(400).json({
        status: false,
        message: "School is assigned to students. Please delete all student records before deleting the school.",
      });
    }

    // Proceed to delete the school
    await School.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "School deleted successfully",
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const errorMessage = Object.values(error.errors)
        .map((err) => err.message || "Validation Error")
        .join(" ");
      return res.status(400).json({ status: false, message: errorMessage });
    }

    // Handle general errors
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



// Edit school function
export const editSchool = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    schoolId,
    password,
    schoolVillage,
    talukka,
    district,
    coordinator,
    headMasterName,
    headMasterMobile,
  } = req.body;

  try {
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "School ID not found",
      });
    }

    // Check if the school exists
    const existingSchool = await School.findById(id);
    if (!existingSchool) {
      return res.status(404).json({
        status: false,
        message: "School not found",
      });
    }

    // Update school details
    const updatedSchool = await School.findByIdAndUpdate(
      id,
      {
        name,
        schoolId,
        password,
        schoolVillage,
        talukka,
        district,
        coordinator,
        headMasterName,
        headMasterMobile,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      status: true,
      message: "School updated successfully",
      school: updatedSchool,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessage = Object.values(error.errors)
        .map((err) => err.message || "Validation Error")
        .join(" ");
      return res.status(400).json({ status: false, message: errorMessage });
    }
    return res.status(500).json({
      status: false,
      message: "Failed to update school",
      error: error.message,
    });
  }
};


export const getSchoolById = async (req, res, next) => {
  const { id } = req.params
  const getSchool = await School.findById(id)
  if (!getSchool) {
    return res.status(400).json({
      status: false,
      message: "No student found",
      getSchool
    })
  }
  res.status(200).json({
    status: true,
    message: "Student fetched successfully",
    getSchool
  })
}

