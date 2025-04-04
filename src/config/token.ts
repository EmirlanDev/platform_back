import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (userId: string, userEmail: string) => {
  return jwt.sign({ id: userId, email: userEmail }, JWT_SECRET, {
    expiresIn: "5d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { id: string; email: string };
};
