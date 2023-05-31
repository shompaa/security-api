import express from "express";
import { detectPlate } from "./image-detect.controller.js";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/detect", upload.single("image"), detectPlate);

export default router;
