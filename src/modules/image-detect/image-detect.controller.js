import { ImageAnnotatorClient } from "@google-cloud/vision";
import { googleConfig } from "../../utils/helpers/index.helper.js";

const client = new ImageAnnotatorClient({
  credentials: googleConfig,
});
const PLATE_REGEX = /([A-Z]{2})\W*([A-Z]{2})\W*(\d{2})/;

export const detectPlate = async (req, res, next) => {
  try {
    const { buffer } = req.file;

    const [result] = await client.textDetection(buffer);
    const detections = result.textAnnotations;
    const descriptions = detections.map((detection) => detection.description);
    const fullDescription = descriptions.join(" ");

    const licensePlate = fullDescription.match(PLATE_REGEX);
    const plate = licensePlate ? licensePlate.slice(1, 4).join("-") : null;

    if (!plate) {
      throw new Error("Formato de placa inválido");
    }
    res.status(200).json({ data: plate });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
