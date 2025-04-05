"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Файл не был загружен" });
        }
        const file = req.file;
        res.status(200).json({
            message: "Файл успешно загружен!",
            url: file.path,
            public_id: file.filename,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Ошибка при загрузке файла." });
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
exports.default = {
    uploadImage,
    // deleteImage,
};
