import { Request, Response } from "express"
import { connectDB } from "@/config/sqlDB-DESKTOP"
import sql from "mssql"

export const getClientes = async (req: Request, res: Response) => {
  try {
    const { accion } = req.params;
    const pool = await connectDB();

    const result = await pool
      .request()
      .input("accion", sql.Char(4), accion)
      .execute("sp_Clientes");
    res.json(result.recordset);
  } catch (err: any) {
    console.error("Error al ejecutar SP:", err);
    res.status(500).json({ message: err.message });
  }
};

export const putClientes = async (req: Request, res: Response) => {
  try {
    const { id, accion } = req.params;
    const { nombre, cuit, direccion } = req.body;
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("nombre", sql.VarChar(50), nombre)
      .input("cuit", sql.VarChar(20), cuit)
      .input("direccion", sql.VarChar(50), direccion)
      .input("id", sql.Int, id)
      .input("accion", sql.Char(4), accion)
      .execute("sp_Clientes");
    res.json(result.recordset);
  } catch (err: any) {
    console.error("Error al ejecutar SP:", err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  try {
    const { id, accion } = req.params;
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("accion", sql.Char(4), accion)
      .execute("sp_Clientes");
    res.json(result.recordset);

    console.log(result)
  } catch (err: any) {
    console.error("Error al ejecutar SP:", err);
    res.status(500).json({ message: err.message });
  }
};

export const postCliente = async (req: Request, res: Response) => {
  try {
    const { accion } = req.params;
    const { nombre, cuit, direccion } = req.body;
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("nombre", sql.VarChar(50), nombre)
      .input("cuit", sql.VarChar(20), cuit)
      .input("direccion", sql.VarChar(50), direccion)
      .input("accion", sql.Char(4), accion)
      .execute("sp_clientes");
    res.json(result.recordset);
  } catch (err: any) {
    console.error("Error al ejecutar SP:", err);
    res.status(500).json({ message: err.message });
  }
};