import { Request, Response } from "express";
import { connectDB } from "../config/sqlDB-DESKTOP";
import sql from "mssql";

export const getGeneradorCTickets = async (req: Request, res: Response) => {
  try {
    const { idEmpresa } = req.params;
    const {
      importeTotal,
      litrosPromedio,
      margenLitros,
      importeMinimo,
      importeMaximo
    } = req.body;
    const pool = await connectDB(); //Conexion a la base de datos
    const result = await pool
      .request()
      .input("importeTotal", sql.Decimal(18, 2), importeTotal)
      .input("litrosPromedio", sql.Decimal(18, 2), litrosPromedio)
      .input("margenLitros", sql.Decimal(18, 2), margenLitros)
      .input("importeMinimo", sql.Decimal(18, 2), importeMinimo)
      .input("importeMaximo", sql.Decimal(18, 2), importeMaximo)
      .input("idEmpresa", sql.Int, idEmpresa)
      .execute("calcular_comprobantes");
    res.json(result.recordset); //Respuesta con los datos obtenidos
  } catch (err) {
    console.error("Error al generar el detalle de los tickets:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};