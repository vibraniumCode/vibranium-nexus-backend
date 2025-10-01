import { Request, Response } from "express";
import { connectDB } from "@/config/sqlDB-DESKTOP";
import sql from "mssql";

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
    console.log({
      idEstacion,
      accion,
      nomEstacion,
      cuit,
      ingBrutos,
      direccion,
      cp,
      localidad,
      provincia,
      telefono,
      actividad,
      idUser
    });

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
      .input("actividad", sql.Date, actividad)
      .input("idUser", sql.Int, idUser)
      .input("idEstacion", sql.Int, idEstacion)
      .input("accion", sql.Char(4), accion)
      .execute("sp_estaciones");

    res.json(result.recordset);
  } catch (err: any) {
    console.error("Error al ejecutar SP:", err);
    res.status(500).json({ message: err.message });
  }
}
