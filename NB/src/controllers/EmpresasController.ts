import { Request, Response } from "express";
import { connectDB } from "@/config/sqlDB-DESKTOP";
import sql, { IResult, IRecordSet } from "mssql";

export const getEmpresas = async (req: Request, res: Response) => {
  try {
    const { accion } = req.params;
    const pool = await connectDB();

    const result = await pool
      .request()
      .input("accion", sql.Char(4), accion)
      .execute("sp_estaciones");

    res.json(result.recordset);
  } catch (err: any) {
    console.error("Error al ejecutar SP:", err);
    res.status(500).json({ message: err.message });
  }
};

export const putEmpresas = async (req: Request, res: Response) => {
  try {
    const { idEstacion, accion } = req.params;
    const {
      nomEstacion
      , cuit
      , ingBrutos
      , direccion
      , cp
      , localidad
      , provincia
      , telefono
      , actividad
      , idUser
    } = req.body;
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("nomEstacion", sql.VarChar(50), nomEstacion)
      .input("cuit", sql.VarChar(20), cuit)
      .input("ingBrutos", sql.VarChar(20), ingBrutos)
      .input("direccion", sql.VarChar(50), direccion)
      .input("cp", sql.Char(4), cp)
      .input("localidad", sql.VarChar(50), localidad)
      .input("provincia", sql.VarChar(50), provincia)
      .input("telefono", sql.VarChar(15), telefono)
      .input("actividad", sql.VarChar(50), actividad)
      .input("idUser", sql.Int, idUser)
      .input("idEstacion", sql.Int, idEstacion)
      .input("accion", sql.Char(4), accion)
      .execute("sp_estaciones");
    // console.log('Resultado del SP:', result);
    res.json(result.recordset[0]);
  } catch (err: any) {
    console.error("Error al ejecutar SP:", err);
    res.status(500).json({ message: err.message });
  }
}

export const deleteEmpresa = async (req: Request, res: Response) => {
  try {
    const { idEstacion, accion } = req.params;
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("idEstacion", sql.Int, idEstacion)
      .input("accion", sql.Char(4), accion)
      .execute("sp_estaciones");
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

export const postEmpresa = async (req: Request, res: Response) => {
  try {
    const { accion } = req.params;
    const {
      nomEstacion
      , cuit
      , ingBrutos
      , direccion
      , cp
      , localidad
      , provincia
      , telefono
      , actividad
      , idUser
    } = req.body;
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("nomEstacion", sql.VarChar(50), nomEstacion)
      .input("cuit", sql.VarChar(20), cuit)
      .input("ingBrutos", sql.VarChar(20), ingBrutos)
      .input("direccion", sql.VarChar(50), direccion)
      .input("cp", sql.Char(4), cp)
      .input("localidad", sql.VarChar(50), localidad)
      .input("provincia", sql.VarChar(50), provincia)
      .input("telefono", sql.VarChar(15), telefono)
      .input("actividad", sql.VarChar(50), actividad)
      .input("idUser", sql.Int, idUser)
      .input("accion", sql.Char(4), accion)
      .execute("sp_estaciones");
    res.json(result.recordset[0]);
  } catch (err: any) {
    console.error("Error al ejecutar SP:", err);
    res.status(500).json({ message: err.message });
  }
};

export const detailsEmpresa = async (req: Request, res: Response) => {
  try {
    const { idEstacion } = req.params;
    const pool = await connectDB();

    const result: IResult<any> = await pool
      .request()
      .input("idEmpresa", sql.Int, idEstacion)
      .execute("sp_detalle_gral");

    // ✅ Forzamos el tipo como array
    const recordsets = result.recordsets as IRecordSet<any>[];

    const [infoEmpresa, combustible, impuesto] = recordsets;

    res.json({
      empresa: infoEmpresa?.[0] || null,
      combustible: combustible || [],
      impuesto: impuesto || []
    });
  } catch (err: any) {
    console.error("Error al ejecutar SP:", err);
    res.status(500).json({ message: err.message });
  }
};
