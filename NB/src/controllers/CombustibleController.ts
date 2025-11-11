import { Request, Response } from "express";
import { connectDB } from "../config/sqlDB-DESKTOP";
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

//------------------------------------------//

export const postCombustibleEmpresa = async (req: Request, res: Response) => {
  try {
    const { accion, idAccion } = req.params;
    const { idEmpresa, idCombustible, monto } = req.body;
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("idEmpresa", sql.Int, idEmpresa)
      .input("idCombustible", sql.Int, idCombustible)
      .input("monto", sql.Numeric, monto)
      .input("accion", sql.Char(4), accion)
      .input("idAccion", sql.Int, idAccion)
      .execute("sp_detalle_gral");
    res.json(result.recordset);
  } catch (err: any) {
    console.error("Error al ejecutar SP:", err);
    res.status(500).json({ message: err.message });
  }
};


export const deleteCombustibleEmpresa = async (req: Request, res: Response) => {
  try {
    const { idEmpresa, idCombustible, accion, idAccion } = req.params;
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("idEmpresa", sql.Int, idEmpresa)
      .input("idCombustible", sql.Int, idCombustible)
      .input("accion", sql.Char(4), accion)
      .input("idAccion", sql.Int, idAccion)
      .execute("sp_detalle_gral");
    res.json(result.recordset[0]);
  } catch (err: any) {
    console.error("⚠️ ERROR DETALLADO EN DELETE:", {
      message: err.message,
      name: err.name,
      code: err.code,
      number: err.number,
      lineNumber: err.lineNumber,
      state: err.state,
      stack: err.stack,
      originalError: err.originalError,
    });

    res.status(500).json({
      error: true,
      message: err.message,
      code: err.code,
      details: err.originalError,
    });
  }
};

export const putCombustibleEmpresa = async (req: Request, res: Response) => {
  try {
    const { idEmpresa, idCombustible, accion, idAccion } = req.params;
    const { monto } = req.body;

    const pool = await connectDB();
    const result = await pool
      .request()
      .input("idEmpresa", sql.Int, idEmpresa)
      .input("idCombustible", sql.Int, idCombustible)
      .input("monto", sql.Decimal(18, 2), parseFloat(monto))
      .input("accion", sql.Char(4), accion)
      .input("idAccion", sql.Int, idAccion)
      .execute("sp_detalle_gral");
    res.json(result.recordset[0]);
  } catch (err: any) {
    console.error("Error al ejecutar SP:", err);
    res.status(500).json({ message: err.message });
  }
};