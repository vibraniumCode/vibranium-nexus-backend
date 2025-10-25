import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const users = [
  { id: 1, email: "test@demo.com", password: bcrypt.hashSync("123456", 10) },
];

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "secretKey",
    { expiresIn: "1h" }
  );

  res.json({ token, user: { id: user.id, email: user.email } });
};
