import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "./../../config/prisma";
import generateToken from "./../../config/token";

const register = async (req: Request, res: Response) => {
  try {
    const { name, lastName, email, password, photoURL } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        lastName,
        password: hashedPassword,
        email,
      },
    });
    const token = generateToken(user.id, user.email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.json({
      message: "Успешный вход",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при регистрации!" });
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

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.json({
      message: "Успешный вход",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка входа в систему" });
  }
};

const logout = (req: Request, res: Response) => {
  req.logOut((err) => {
    if (err) {
      res.status(500).json({ error: "Logut не удался" });
    }
    res.json({ message: "Выход из системы" });
  });
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

    // Обновляем поля пользователя, если они переданы
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

    // Сохраняем обновлённого пользователя
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

    // Отправляем успешный ответ с обновлёнными данными
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
