import { Router } from "express";
import { getServices } from "../controllers/service.controller.js";

const router = Router();

router.route("/service").get(getServices);

export const serviceRoute = router;