import express from "express";
import { check } from "express-validator";
import {
  addCar,
  editCar,
  getCar,
  getCarByPatent,
  removeCar,
} from "../controllers/index.controller.js";
import { JWTValidation, Validation } from "../middlewares/index.middleware.js";

const router = express.Router();

router.get("/:id", JWTValidation, getCar);
router.get("/patent/:patent", JWTValidation, getCarByPatent);
router.post(
  "/",
  [
    JWTValidation,
    check("brand", "Brand is required").not().isEmpty(),
    check("model", "Model is required").not().isEmpty(),
    check("year", "Year is required").not().isEmpty(),
    check("patent", "Patent is required").not().isEmpty(),
    check("color", "Color is required").not().isEmpty(),
    check("address", "Address is required").isMongoId(),
    Validation,
  ],
  addCar
);
router.put(
  "/:id",
  [
    JWTValidation,
    check("brand", "Brand is required").not().isEmpty(),
    check("model", "Model is required").not().isEmpty(),
    check("year", "Year is required").not().isEmpty(),
    check("patent", "Patent is required").not().isEmpty(),
    check("color", "Color is required").not().isEmpty(),
    Validation,
  ],
  editCar
);
router.delete("/:id", JWTValidation, removeCar);

export default router;
