import path from "path";
import { fileURLToPath } from "url";
import { ImageAnnotatorClient } from "@google-cloud/vision";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(
  __dirname,
  "../utils/secret.json"
);

const client = new ImageAnnotatorClient();
const PLATE_REGEX = /([A-Z]{2})\W*([A-Z]{2})\W*(\d{2})/;

export const detectPlate = async (req, res, next) => {
  try {
    const { buffer } = req.file;

    const [result] = await client.textDetection(buffer);
    const detections = result.textAnnotations;
    const descriptions = detections.map((detection) => detection.description);
    const fullDescription = descriptions.join(" ");

    const licensePlate = fullDescription.match(PLATE_REGEX);
    const plate = licensePlate
      ? licensePlate.slice(1, 4).join("-")
      : null;

    if (!plate) {
      throw new Error("Formato de placa inválido");
    }
    res.status(200).json({ plate });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
