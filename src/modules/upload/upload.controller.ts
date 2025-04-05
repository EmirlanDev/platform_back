import { Request, Response } from "express";
import cloudinary from "../../config/cloudinary";

const uploadImage = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Файл не был загружен" });
    }

    const file = req.file as any;

    res.status(200).json({
      message: "Файл успешно загружен!",
      url: file.path,
      public_id: file.filename,
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при загрузке файла." });
  }
};

const uploadBackgroundImage = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Фон не был загружен" });
    }

    const file = req.file as any;

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "backgrounds",
    });

    res.status(200).json({
      message: "Фоновое изображение успешно загружено!",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при загрузке фонового изображения." });
  }
};

// const deleteImage = async (req: Request, res: Response) => {
//   const { public_id } = req.body;

//   try {
//     const result = await cloudinary.uploader.destroy(public_id);
//     res.status(200).json({
//       message: "Файл удалён из Cloudinary.",
//       result,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Ошибка при удалении файла." });
//   }
// };

export default {
  uploadImage,
  // deleteImage,
  uploadBackgroundImage,
};
