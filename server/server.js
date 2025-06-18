import express from "express";
import cors from "cors";
import { authRoute } from "./router/auth.router.js";
import { contactRoute } from "./router/contact.router.js"
import { connectDB } from "./config/db.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: "GET, POST, DELETE, PUT, PATCH, HEAD",
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;

// connectDB to Database Function
connectDB();

app.use(express.json());
// And Create new Route Api
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute)

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.status(200).send("Home page");
});

app.get("/register", (req, res) => {
  res.status(200).send("Register page");
});

// connectDB().then(()=>{
// })
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// solve error

// app.use(cors(corsOptions));

// ReferenceError: Cannot access 'app' before initialization
