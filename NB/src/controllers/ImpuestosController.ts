import { Request, Response } from "express";
import { connectDB } from "../config/sqlDB-DESKTOP";
import sql from "mssql";
import { execFile } from "child_process";

export const getTImpuestos = async (req: Request, res: Response) => {
  try {
    const pool = await connectDB(); //Conexion a la base de datos
    const result = await pool.request().query("EXEC sp_impuestos");
    res.json(result.recordset); //Respuesta con los datos obtenidos
  } catch (err) {
    console.error("Error al obtener los impuestos:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const postTImpuestos = async (req: Request, res: Response) => {
  try {
    const { accion } = req.params;
    const { tipo } = req.body;
    const pool = await connectDB(); //Conexion a la base de datos
    const result = await pool
      .request()
      .input("tipo", sql.VarChar(50), tipo)
      .input("accion", sql.Char(4), accion)
      .execute("sp_impuestos");
    res.json(result.recordset); //Respuesta con los datos obtenidos
  } catch (err) {
    console.error("Error al crear el impuesto:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteTImpuestos = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("id", sql.Int, parseInt(id))
      .input("accion", sql.Char(4), 'DLTE')
      .execute("sp_impuestos");
    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Error al eliminar el impuesto:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

export const postImpuestos = async (req: Request, res: Response) => {
  try {
    const { accion, idAccion } = req.params;
    const { idEmpresa, idCombustible, idImpuesto, monto } = req.body;
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("idEmpresa", sql.Int, idEmpresa)
      .input("idCombustible", sql.Int, idCombustible)
      .input("idImpuesto", sql.Int, idImpuesto)
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


export const deleteImpuestos = async (req: Request, res: Response) => {
  try {
    const { idEmpresa, idCombustible, idImpuesto, accion, idAccion } = req.params;
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("idEmpresa", sql.Int, idEmpresa)
      .input("idCombustible", sql.Int, idCombustible)
      .input("idImpuesto", sql.Int, idImpuesto)
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

export const putEmpresas = async (req: Request, res: Response) => {
  try {
    const { idEmpresa, idCombustible, idImpuesto, accion, idAccion } = req.params;
    const { monto } = req.body;

    console.log('Params recibidos:', { idEmpresa, idCombustible, idImpuesto, accion }); // 👈 Debug
    console.log('Body recibido:', { monto, tipo: typeof monto }); // 👈 Debug

    const pool = await connectDB();
    const result = await pool
      .request()
      .input("idEmpresa", sql.Int, idEmpresa)
      .input("idCombustible", sql.Int, idCombustible)
      .input("idImpuesto", sql.Int, idImpuesto)
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
