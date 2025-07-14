import { Router } from "express";
import * as adminController from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

router.route("/users").get(authMiddleware, adminMiddleware, adminController.getAllUsers);

router.route("/users/:id").get(authMiddleware, adminMiddleware, adminController.getUserById);

router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, adminController.updateUserById);

router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById);

router.route("/contacts").get(authMiddleware, adminController.getAllContacts);


export const adminRoute = router;