import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sql from 'mssql';
import dbConfig from '../config/sqlDB-DESKTOP';
import { validationResult } from 'express-validator/check';

// Iniciar sesión
export const login = async (req: Request, res: Response): Promise<void> => {
  // Validar errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { usuario, password } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('usuario', sql.VarChar, usuario)
      .execute('sp_ValidarUsuario');

    // Usuario no encontrado
    if (result.recordset.length === 0) {
      res.status(401).json({ message: 'Credenciales inválidas' }); // ⚠️ Cambio: No especificar "usuario no encontrado" por seguridad
      return;
    }

    const user = result.recordset[0];

    // Cuenta inactiva
    if (!user.activo) {
      res.status(403).json({ message: 'Cuenta inactiva' });
      return;
    }

    // Verificar contraseña
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(401).json({ message: 'Credenciales inválidas' }); // ⚠️ Cambio: Mensaje genérico por seguridad
      return;
    }

    // ✅ NUEVO: Actualizar ultimo_login
    await pool.request()
      .input('id', sql.Int, user.id)
      .query('UPDATE usuarios SET ultimo_login = GETDATE() WHERE id = @id');

    // Generar token
    const token = jwt.sign(
      { id: user.id, usuario: user.usuario },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' } // ⚠️ Cambio: 1 hora en lugar de 10 segundos
    );

    const expirationTime = Math.floor(Date.now() / 1000) + (60 * 60); // ⚠️ Cambio: 1 hora

    res.status(200).json({
      message: 'Login exitoso',
      token,
      token_expiration: expirationTime,
      user: { // ✅ NUEVO: Enviar datos del usuario
        id: user.id,
        usuario: user.usuario,
        nombre: user.nombre // Si lo tienes en el SELECT del SP
      }
    });

  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};