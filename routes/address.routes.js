import express from "express";
import { check } from "express-validator";
import {
  addAddress,
  approveAddress,
  editAddress,
  getAddress,
  getCarsByAddress,
  getOwnersByAddress,
  getPendingAddresses,
  removeAddress,
} from "../controllers/index.controller.js";
import { JWTValidation, Validation } from "../middlewares/index.middleware.js";

const router = express.Router();
router.get("/pending", JWTValidation, getPendingAddresses);
router.get("/:id/owners", JWTValidation, getOwnersByAddress);
router.get("/:id/cars", JWTValidation, getCarsByAddress);
router.get("/:id", JWTValidation, getAddress);
router.post(
  "/",
  [
    JWTValidation,
    check("street", "Street is required").not().isEmpty(),
    check("number", "Number is required").not().isEmpty(),
    check("district", "District is required").not().isEmpty(),
    Validation,
  ],
  addAddress
);
router.put("/pending/:id", JWTValidation, approveAddress);
router.put(
  "/:id",
  [
    JWTValidation,
    check("street", "Street is required").not().isEmpty(),
    check("number", "Number is required").not().isEmpty(),
    check("district", "District is required").not().isEmpty(),
    Validation,
  ],
  editAddress
);
router.delete("/:id", JWTValidation, removeAddress);

export default router;
