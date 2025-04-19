import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.status(200).send("Home page");
});

app.get("/register", (req, res) => {
  res.status(200).send("Register page");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});