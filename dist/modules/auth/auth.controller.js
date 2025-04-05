"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("./../../config/prisma"));
const token_1 = require("./../../config/token");
const isProduction = process.env.NODE_ENV === "production";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "None" : "lax",
  maxAge: 5 * 60 * 60 * 1000,
};
const register = async (req, res) => {
  try {
    const { name, lastName, email, password, adminCode } = req.body;
    const existing = await prisma_1.default.user.findUnique({
      where: { email },
    });
    if (existing) {
      return res.status(400).json({ message: "Email уже используется" });
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const isAdmin =
      adminCode.trim() === process.env.NEXT_PUBLIC_IS_ADMIN?.trim();
    const user = await prisma_1.default.user.create({
      data: { name, lastName, email, password: hashedPassword, isAdmin },
    });
    const token = (0, token_1.generateToken)(user.id, user.email);
    res.cookie("token", token, COOKIE_OPTIONS);
    res.status(201).json({ message: "Успешная регистрация" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка при регистрации" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
      return res.status(401).json({ error: "Неверные учетные данные!" });
    }
    const token = (0, token_1.generateToken)(user.id, user.email);
    res.cookie("token", token, COOKIE_OPTIONS);
    res.json({ message: "Успешный вход" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при входе" });
  }
};
const signWithGoogle = async (req, res) => {
  const user = req.user;
  const token = (0, token_1.generateToken)(user?.id, user?.email);
  res.cookie("token", token, COOKIE_OPTIONS);
  res.redirect(`${process.env.GOOGLE_REDIRECT}/verification`);
};
const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "lax",
  });
  res.status(200).json({ message: "Выход выполнен успешно" });
};
const editUser = async (req, res) => {
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
    const user = await prisma_1.default.user.findUnique({ where: { id } });
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
      const existingUser = await prisma_1.default.user.findUnique({
        where: { email },
      });
      if (existingUser && existingUser.id !== id) {
        return res.status(400).json({ message: "Email уже используется" });
      }
      user.email = email;
    }
    const updatedUser = await prisma_1.default.user.update({
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
exports.default = {
  register,
  login,
  logout,
  editUser,
  signWithGoogle,
};
