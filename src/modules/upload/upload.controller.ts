import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const uploadImage = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Файл не был загружен" });
    }

    const { filename, path: filePath } = req.file;
    const uploadDir = path.join(__dirname, "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const processedFilename = `processed_${filename}`;
    const outputPath = path.join(uploadDir, processedFilename);

    await sharp(filePath).resize(800).toFile(outputPath);

    const imageUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/${processedFilename}`;

    res.json({
      message: "Файл успешно обработан!",
      processedImagePath: imageUrl,
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обработке файла." });
  }
};

export default {
  uploadImage,
};
