import { Request, Response } from "express";
import { connectDB } from "@/config/sqlDB-DESKTOP";
import sql from 'mssql';

export const getTCombustible = async (req: Request, res: Response) => {
  try {
    const pool = await connectDB(); //Conexion a la base de datos
    const result = await pool.request().execute("sp_combustible");
    res.json(result.recordset); //Respuesta con los datos obtenidos
  } catch (err) {
    console.error("Error al obtener los combustibles:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getCombustible = async (req: Request, res: Response) => {
  try {
    const { idEmpresa } = req.params;

    const pool = await connectDB();
    const result = await pool.request()
      .input('idEmpresa', sql.Int, parseInt(idEmpresa)) // Convierte a número y especifica el tipo
      .query("SELECT  c.idTipo, tc.txtDesc AS Combustible, c.precio FROM Combustible c INNER JOIN TCombustible tc ON tc.idTC = c.idTipo WHERE c.idEmpresa = @idEmpresa");

    res.json(result.recordset);
  } catch (err) {
    console.error("Error al obtener los combustibles:", err);
    // Muestra más detalles del error en desarrollo
    res.status(500).json({
      message: "Error interno del servidor",
      error: process.env.NODE_ENV === 'development' ? (err as Error).message : undefined
    });
  }
};

export const postTCombustible = async (req: Request, res: Response) => {
  try {
    const { accion } = req.params;
    const { txtDesc } = req.body;
    console.log("Tipo recibido:", txtDesc);
    const pool = await connectDB(); //Conexion a la base de datos
    const result = await pool
      .request()
      .input("tipo", sql.VarChar(50), txtDesc)
      .input("accion", sql.Char(4), accion)
      .execute("sp_combustible");
    res.json(result.recordset); //Respuesta con los datos obtenidos
  } catch (err) {
    console.error("Error al crear el combustible:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para actualizar precio
// export const updateCombustiblePrice = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { precio } = req.body;

//     // Validar que el precio sea un número válido
//     if (!precio || isNaN(Number(precio))) {
//       return res.status(400).json({ message: "Precio inválido" });
//     }

//     const pool = await connectDB();

//     // Actualizar el precio en la base de datos
//     const result = await pool.request()
//       .input('id', id)
//       .input('precio', Number(precio))
//       .query(`
//         UPDATE Combustible
//         SET precio = @precio
//         WHERE id = @id
//       `);

//     // Verificar si se actualizó algún registro
//     if (result.rowsAffected[0] === 0) {
//       return res.status(404).json({ message: "Combustible no encontrado" });
//     }

//     // Obtener el registro actualizado para devolverlo
//     const updatedResult = await pool.request()
//       .input('id', id)
//       .query('SELECT * FROM Combustible WHERE id = @id');

//     return res.json({
//       message: "Precio actualizado correctamente",
//       combustible: updatedResult.recordset[0]
//     });

//   } catch (err) {
//     console.error("Error al actualizar el precio:", err);
//     return res.status(500).json({ message: "Error interno del servidor" });
//   }
// };