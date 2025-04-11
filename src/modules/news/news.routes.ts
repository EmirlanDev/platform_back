import { Router } from "express";
import newsControllers from "./news.controllers";
const router = Router();

router.post("/add", newsControllers.addNews);
router.get("/get-all", newsControllers.getAllNews);
router.get("/:id", newsControllers.getNewsById);
router.delete("/delete", newsControllers.deleteNews);

export default router;
