import { Message } from "../Model/MessageModel.js";

export const sendMessage = async (req, res, next) => {
  const { name, email, message } = req.body;
  try {
    const newMessage = await Message.create({ name, email, message });
    return res.status(200).json({
      status: true,
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        status: false,
        message: validationErrors,
        errors: validationErrors,
      });
    }
    return res.status(500).json({
      status: false,
      message: "Something went wrong, please try again!",
      error: error.message,
    });
  }
};

export const getAllMessages = async (req, res, next) => {
  try {
    const getAllMessagesResponse = await Message.find();
    return res.status(200).json({
      status: true,
      message: "Retrieved all messages",
      getAllMessagesResponse,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong while retrieving messages",
      error: error.message,
    });
  }
};

export const deleteMessage = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next();

  try {
    const deleteMessage = await Message.findByIdAndDelete(id);
    if (!deleteMessage) {
      return res.status(404).json({
        status: false,
        message: "Message not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong while deleting the message",
      error: error.message,
    });
  }
};
