import { Request, Response } from "express";
import { connectDB } from "../config/sqlDB-DESKTOP";
import sql from "mssql";

export const postGeneradorCTickets = async (req: Request, res: Response) => {
  try {
    const { idEmpresa } = req.params;
    const {
      importeTotal,
      litrosPromedio,
      margenLitros,
      importeMinimo,
      importeMaximo,
      idCombustible
    } = req.body;

    const pool = await connectDB();
    const result = await pool
      .request()
      .input("importeTotal", sql.Decimal(18, 2), importeTotal)
      .input("litrosPromedio", sql.Decimal(18, 2), litrosPromedio)
      .input("margenLitros", sql.Decimal(18, 2), margenLitros)
      .input("importeMin", sql.Decimal(18, 2), importeMinimo)
      .input("importeMax", sql.Decimal(18, 2), importeMaximo)
      .input("idCombustible", sql.Int, idCombustible)
      .input("idEmpresa", sql.Int, idEmpresa)
      .execute("calcular_comprobantes");

    // Capturar ambos result sets (puede ser un array o un objeto indexado por nombre)
    const recordsetsArr = Array.isArray(result.recordsets)
      ? result.recordsets
      : Object.values(result.recordsets);

    const comprobantes = recordsetsArr[0];      // Primer result set
    const resumenCalculado = recordsetsArr[1];  // Segundo result set

    res.json({
      comprobantes: comprobantes,
      resumen: resumenCalculado[0]  // El resumen es una sola fila
    });
  } catch (err) {
    console.error("Error al generar el detalle de los tickets:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const postDetalleImpuestoTickets = async (req: Request, res: Response) => {
  try {
    const { idEmpresa } = req.params;
    const { litros, idCombustible, totalFinal } = req.body;
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("Litros", sql.Int, litros)
      .input("idCombustible", sql.Int, idCombustible)
      .input("TotalFinal", sql.Decimal(18, 2), totalFinal)
      .input("idEmpresa", sql.Int, idEmpresa)
      .execute("sp_CalcularFacturaImpuestos");

    const recordsetsArr = Array.isArray(result.recordsets)
      ? result.recordsets
      : Object.values(result.recordsets);

    const detalleImporteGeneral = recordsetsArr[0];
    const detalleImpuestos = recordsetsArr[1];
    const detalleFinal = recordsetsArr[2];

    res.json({
      detalleImporteGeneral: detalleImporteGeneral,
      detalleImpuestos: detalleImpuestos,
      detalleFinal: detalleFinal
    });
  } catch (err) {
    console.error("Error al obtener el detalle de impuestos de los tickets:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
