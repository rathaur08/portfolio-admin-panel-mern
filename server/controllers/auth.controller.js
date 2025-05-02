import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getHomePage = (req, res) => {

  try {
    res.status(200).send("Home page 'api/auth' router root.");
  } catch (error) {
    console.log(error);
  }
};

export const postRegisterPage = async (req, res, next) => {

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

    res.status(201).json({
      msg: "User Registration Successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    // res.status(404).json({ message: "Internal Server Error" });
    console.error(error);
    next(error);
  }
};

// postLoginPage
export const postLoginPage = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check Email 
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(404).json({ msg: "Invalid Credentials!" })
    }

    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(201).json({
        msg: "User Login Successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password!" });
    }
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
    console.error(error);
  }
}