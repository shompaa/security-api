import express from "express";
import { check } from "express-validator";
import {
  addOwner,
  asociateCar,
  editOwner,
  getCarsByOwner,
  getOwner,
  getOwners,
  removeOwner,
} from "../controllers/index.controller.js";
import { JWTValidation, Validation } from "../middlewares/index.middleware.js";

const router = express.Router();

router.get("/", JWTValidation, getOwners);
router.get("/:id/cars", JWTValidation, getCarsByOwner);
router.get("/:id", JWTValidation, getOwner);
router.post(
  "/",
  [
    JWTValidation,
    check("name", "Name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("rut", "Rut is required").not().isEmpty(),
    check("address", "Address is required").isMongoId(),
    Validation,
  ],
  addOwner
);
router.post("/car-associate", JWTValidation, asociateCar);
router.put(
  "/:id",
  [
    JWTValidation,
    check("name", "Name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("rut", "Rut is required").not().isEmpty(),
    Validation,
  ],
  editOwner
);
router.delete("/:id", JWTValidation, removeOwner);

export default router;
