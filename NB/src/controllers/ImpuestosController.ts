import { Request, Response } from "express";
import { connectDB } from "@/config/sqlDB-DESKTOP";
import sql from "mssql";

export const getImpuestos = async (req: Request, res: Response) => {
  try {
    const pool = await connectDB(); //Conexion a la base de datos
    const result = await pool.request().query("SELECT * FROM Timpuestos");
    res.json(result.recordset); //Respuesta con los datos obtenidos
  } catch (err) {
    console.error("Error al obtener los impuestos:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getImpEstacion = async (req: Request, res: Response) => {
  try {
    const { accion, id } = req.params;
    const { idImpuesto, meses } = req.query;

    const pool = await connectDB(); // Conexión a la base de datos

    const request = pool.request()
      .input('accion', sql.VarChar(5), accion)
      .input('idEstacion', sql.Int, id);

    // Agregar parámetros opcionales solo si están presentes
    if (idImpuesto !== undefined && idImpuesto !== null && idImpuesto !== '') {
      request.input('idImpuesto', sql.Int, parseInt(idImpuesto as string));
    } else {
      request.input('idImpuesto', sql.Int, null);
    }

    if (meses !== undefined && meses !== null && meses !== '') {
      request.input('meses', sql.Int, parseInt(meses as string));
    } else {
      request.input('meses', sql.Int, null);
    }

    const result = await request.query("EXEC sp_impuestos @accion, @idEstacion, @idImpuesto, @meses");

    // console.log('Parámetros recibidos:', { accion, id, idImpuesto, meses });
    // console.log('Resultado del SP:', result.recordset);

    res.json(result.recordset); // Respuesta con los datos obtenidos

  } catch (err: any) {
    console.error("Error al obtener los impuestos de la estacion:", err);
    res.status(500).json({
      message: "Error interno del servidor",
      error: err.message,
    });
  }
};