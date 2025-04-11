import { Request, Response } from "express";
import prisma from "./../../config/prisma";

const addNews = async (req: Request, res: Response) => {
  try {
    const { image, title, descriptions } = req.body;

    await prisma.news.create({
      data: {
        image,
        title,
        descriptions,
        createdAt: new Date(),
      },
    });

    res.status(201).json({ message: "Новость успешно добавлен" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при добавлении новости" });
  }
};

const getAllNews = async (req: Request, res: Response) => {
  try {
    const allNews = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(allNews);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении новостей" });
  }
};

const getNewsById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.body;

    const oneNews = prisma.news.findUnique({
      where: { id },
    });

    if (!oneNews) {
      return res.status(404).json({ message: "Новость не найдена" });
    }

    res.json(oneNews);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении новости" });
  }
};

const deleteNews = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    await prisma.news.delete({
      where: { id },
    });

    res.json({ message: "Новость успешно удалена" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при удалении новости" });
  }
};

export default {
  addNews,
  getAllNews,
  deleteNews,
  getNewsById,
};
