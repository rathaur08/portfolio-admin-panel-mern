import { Router } from "express";
import * as adminController from "../controllers/admin.controller.js";

const router = Router();

router.route("/users").get(adminController.getAllUsers);
router.route("/contacts").get(adminController.getAllContacts);


export const adminRoute = router;