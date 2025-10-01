import { Request, Response } from "express";
import { connectDB } from "@/config/sqlDB-DESKTOP";

export const getCombustible = async (req: Request, res: Response) => { //Controlador para obtener empresas
  try {
    const pool = await connectDB(); //Conexion a la base de datos
    const result = await pool.request().query("SELECT * FROM Combustible"); //Consulta a la base de datos
    res.json(result.recordset); //Respuesta con los datos obtenidos
  } catch (err) {
    console.error("Error al obtener los combustibles:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para actualizar precio
export const updateCombustiblePrice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { precio } = req.body;

    // Validar que el precio sea un número válido
    if (!precio || isNaN(Number(precio))) {
      return res.status(400).json({ message: "Precio inválido" });
    }

    const pool = await connectDB();

    // Actualizar el precio en la base de datos
    const result = await pool.request()
      .input('id', id)
      .input('precio', Number(precio))
      .query(`
        UPDATE Combustible 
        SET precio = @precio 
        WHERE id = @id
      `);

    // Verificar si se actualizó algún registro
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Combustible no encontrado" });
    }

    // Obtener el registro actualizado para devolverlo
    const updatedResult = await pool.request()
      .input('id', id)
      .query('SELECT * FROM Combustible WHERE id = @id');

    return res.json({
      message: "Precio actualizado correctamente",
      combustible: updatedResult.recordset[0]
    });

  } catch (err) {
    console.error("Error al actualizar el precio:", err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};