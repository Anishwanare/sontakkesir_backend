import { app } from "./app.js";

const PORT = process.env.PORT || 2050;

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "server is running",
  });
});

app.listen(PORT, () => {
  console.log("Server is Connecterd to port",PORT);
});
