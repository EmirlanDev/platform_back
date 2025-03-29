import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "./../../config/prisma";
import { generateToken } from "./../../config/token";

const isProduction = process.env.NODE_ENV === "production";
// const isProduction = false;

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? ("None" as any) : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, lastName, email, password } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email уже используется" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, lastName, email, password: hashedPassword },
    });

    const token = generateToken(user.id, user.email);
    res.cookie("token", token, COOKIE_OPTIONS as any);

    res.status(201).json({ message: "Успешная регистрация" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка при регистрации" });
  }
};

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password!))) {
      return res.status(401).json({ error: "Неверные учетные данные!" });
    }

    const token = generateToken(user.id, user.email);

    res.cookie("token", token, COOKIE_OPTIONS as any);

    res.json({ message: "Успешный вход" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при входе" });
  }
};

const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ("None" as any) : "lax",
  });
  res.status(200).json({ message: "Выход выполнен успешно" });
};

const editUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const {
      bgImage,
      photoURL,
      name,
      lastName,
      profession,
      descr,
      university,
      dateOfBirthDay,
      email,
    } = req.body;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    if (bgImage) user.bgImage = bgImage;
    if (photoURL) user.photoURL = photoURL;
    if (name) user.name = name;
    if (lastName) user.lastName = lastName;
    if (profession) user.profession = profession;
    if (descr) user.descr = descr;
    if (university) user.university = university;
    if (dateOfBirthDay) user.dateOfBirthDay = dateOfBirthDay;
    if (email) {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser && existingUser.id !== id) {
        return res.status(400).json({ message: "Email уже используется" });
      }
      user.email = email;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        bgImage,
        photoURL,
        name,
        lastName,
        profession,
        descr,
        university,
        dateOfBirthDay,
        email,
      },
    });

    res.status(200).json({
      message: "Профиль успешно обновлён",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Ошибка при обновлении пользователя:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

export default {
  register,
  login,
  logout,
  editUser,
};
