import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
}

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token =
    req.cookies["token"] || req.headers.authorization?.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Неверный или истёкший токен",
    });
  }
};

export default authMiddleware;
