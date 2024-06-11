import mongoose from "mongoose";

export const dbConnection = async () => {
  await mongoose
    .connect(
      "mongodb+srv://hospitalmanagement:3117219172@cluster0.6oave2h.mongodb.net/?retryWrites=true",
      { dbName: "dnyanankur" }
    )
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => console.err);
};
