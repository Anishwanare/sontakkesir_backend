import { Coordinator } from "../Model/CoordinatorModel.js";

export const coordinatorRegister = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    school,
    district,
    talukka,
    password,
  } = req.body;

  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !school ||
      !district ||
      !talukka ||
      !password
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingCoordinator = await Coordinator.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingCoordinator) {
      return res.status(400).json({ message: "Coordinator already exists" });
    }

    const newCoordinator = await Coordinator.create({
      firstName,
      lastName,
      role: "coordinator",
      email,
      phone,
      school,
      district,
      talukka,
      password,
    });

    res.status(201).json({
      status: true,
      message: "Coordinator registered successfully",
      newCoordinator,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCoordinators = async (req, res) => {
  try {
    const coordinators = await Coordinator.find();
    res
      .status(200)
      .json({ status: true, message: "fetch successfully", coordinators });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
