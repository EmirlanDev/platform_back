import { Request, Response } from "express";
import { verifyToken } from "../../config/token";
import prisma from "./../../config/prisma";

const getProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Неавторизованный доступ" });
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const remappedUser = {
      id: user.id,
      bgImage: user.bgImage,
      photoURL: user.photoURL,
      name: user.name,
      lastName: user.lastName,
      profession: user.profession,
      descr: user.descr,
      dateOfBirthDay: user.dateOfBirthDay,
      email: user.email,
      university: user.university,
    };

    res.json(remappedUser);
  } catch (error) {
    console.error("Ошибка в getProfile:", error);
    res.status(500).json({ message: "Ошибка на сервере" });
  }
};

const getUserById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const newUser = {
      bgImage: user.bgImage,
      photoURL: user.photoURL,
      name: user.name,
      lastName: user.lastName,
      profession: user.profession,
      descr: user.descr,
      university: user.university,
      dateOfBirthDay: user.dateOfBirthDay,
      email: user.email,
    };

    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

const checkUser = async (req: Request, res: Response): Promise<any> => {
  {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }
    try {
      verifyToken(token);
      return res.json({ authenticated: true });
    } catch (err) {
      return res.json({ authenticated: false });
    }
  }
};

export default {
  getProfile,
  getUserById,
  checkUser,
};
