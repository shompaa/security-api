import express from "express";
import { check } from "express-validator";
import {
  addCar,
  editCar,
  getCar,
  getCarByPlate,
  getCars,
  removeCar,
} from "./car.controller.js";
import {
  JWTValidation,
  Validation,
} from "../../middlewares/index.middleware.js";

const router = express.Router();

router.get("/", JWTValidation, getCars);
router.get("/:id", JWTValidation, getCar);
router.get("/plate/:plate", JWTValidation, getCarByPlate);
router.post(
  "/",
  [
    JWTValidation,
    check("brand", "Brand is required").not().isEmpty(),
    check("model", "Model is required").not().isEmpty(),
    check("year", "Year is required").not().isEmpty(),
    check("plate", "Plate is required").not().isEmpty(),
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
    check("plate", "Plate is required").not().isEmpty(),
    check("color", "Color is required").not().isEmpty(),
    Validation,
  ],
  editCar
);
router.delete("/:id", JWTValidation, removeCar);

export default router;
