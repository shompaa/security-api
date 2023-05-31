import express from "express";
import { check } from "express-validator";
import { login } from "./auth.controller.js";
import { Validation } from "../../middlewares/index.middleware.js";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    Validation,
  ],
  login
);

export default router;
