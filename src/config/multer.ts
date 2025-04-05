import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "./cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "student-platform",
    format: "png",
    public_id: `${Date.now()}-${file.originalname}`,
    transformation: [{ width: 800, crop: "limit" }],
  }),
});

const upload = multer({ storage });

export default upload;
