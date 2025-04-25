import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getHomePage = (req, res) => {

  try {
    res.status(200).send("Home page 'api/auth' router root.");
  } catch (error) {
    console.log(error);
  }
};

export const postRegisterPage = async (req, res) => {

  try {
    // console.log(req.body);
    // res.status(200).json({ message: req.body });
    const { name, email, phone, password } = req.body;

    // Check Email 
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(404).json({ msg: "Email Already Exists" })
    }

    // HASH THE Password
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({ name, email, phone, password })

    res.status(201).json({ userCreated });
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
    console.log(error);
  }
};