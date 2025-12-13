import { Request, Response } from "express";
import { connectDB } from "../config/sqlDB-DESKTOP";
import sql from "mssql";

export const getInforme = async (req: Request, res: Response) => {
  try {
    const { fechaDesde, fechaHasta } = req.body;

    const pool = await connectDB();
    const result = await pool.request()
      .input('fechaDesde', sql.Date, new Date(fechaDesde))
      .input('fechaHasta', sql.Date, new Date(fechaHasta))
      .query("SELECT FECHA, HORA, N_FACTURA, N_LITROS, IMPORTE FROM COMPROBANTE_HISTORICO WHERE CONVERT(DATE, FECHA, 103) BETWEEN @fechaDesde AND @fechaHasta;");

    res.json(result.recordset);
  } catch (err) {
    console.error("Error al obtener el informe:", err);
    // Muestra más detalles del error en desarrollo
    res.status(500).json({
      message: "Error interno del servidor",
      error: process.env.NODE_ENV === 'development' ? (err as Error).message : undefined
    });
  }
};
