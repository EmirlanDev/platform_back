import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

const generateToken = (userId: string, userEmail: string) => {
  return jwt.sign({ id: userId, email: userEmail }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default generateToken;
