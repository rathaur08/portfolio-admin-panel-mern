import express from "express";
import { authRoute } from "./router/auth.router.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 8000;

// connectDB to Database Function
connectDB();

app.use(express.json());
// And Create new Route Api
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.status(200).send("Home page");
});

app.get("/register", (req, res) => {
  res.status(200).send("Register page");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});