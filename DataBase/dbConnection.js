import mongoose from "mongoose";

export const dbConnection = async () => {
  await mongoose
    .connect(
      "mongodb+srv://dnyanankur:11111@cluster0.5slqu7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      { dbName: "dnyanankur" }
    )
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => console.err);
};
