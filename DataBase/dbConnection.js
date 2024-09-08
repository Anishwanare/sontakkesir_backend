import mongoose from "mongoose";

export const dbConnection = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI, { dbName: "dnyanankur" })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => console.err);
};