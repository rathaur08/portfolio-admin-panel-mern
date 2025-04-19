import { Router } from "express";

const router = Router();

router.route("/").get((req, res) => {
  res.status(200).send("Home page 'api/auth' router root");
});

router.route("/register").get((req, res) => {
  res.status(200).send("Register page");
});

export const authRoute = router;