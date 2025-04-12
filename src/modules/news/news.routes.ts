import { Router } from "express";
import newsControllers from "./news.controllers";
import authMiddleware from "./../../middleware/authMiddleware";
const router = Router();

router.post("/add", authMiddleware, newsControllers.addNews);
router.get("/get-all", authMiddleware, newsControllers.getAllNews);
router.get("/:id", authMiddleware, newsControllers.getNewsById);
router.patch("/edit/:id", newsControllers.updateNews);
router.delete("/delete", authMiddleware, newsControllers.deleteNews);

export default router;
