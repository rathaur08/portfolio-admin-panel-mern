import { Router } from "express";
import { postContactForm } from "../controllers/contact.controller.js";

const router = Router();

router.route("/contact").post(postContactForm);

export const contactRoute = router;