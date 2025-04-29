import { Router } from "express";
import * as authControllers from "../controllers/auth.controller.js";
import { signupSchema } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
// import { getHomePage, getRegisterPage } from "../controllers/auth.controller.js";

const router = Router();

router.route("/").get(authControllers.getHomePage);

router.route("/register").post(validate(signupSchema), authControllers.postRegisterPage);
router.route("/login").post(authControllers.postLoginPage);

// 404 Page Not Found (Use router.use to handle all methods)
router.use((req, res) => {
  res.status(404).send("404 - Page Not Found",
    { message: "this api root not found" });
});

export const authRoute = router;