import { Router } from 'express';
import { login } from '../controllers/authController';
import { body } from 'express-validator/check';
import { loginLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post(
  '/login',
  loginLimiter,
  [
    body('usuario')
      .notEmpty().withMessage('El usuario es obligatorio')
      .trim() // ✅ NUEVO: Elimina espacios
      .isLength({ min: 3, max: 10 }).withMessage('Usuario debe tener entre 3 y 10 caracteres'),
    body('password')
      .notEmpty().withMessage('La contraseña es obligatoria')
      .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
  login
);

export default router;