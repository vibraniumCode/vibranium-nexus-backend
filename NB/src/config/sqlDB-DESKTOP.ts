import sql from "mssql";

const config: sql.config = {
  server: process.env.DB_SERVER || "MLOPEZ\\VMDOOM_DEV",
  database: process.env.DB_NAME || "Nexus",
  user: process.env.DB_USER || "mlopez_nexus",
  password: process.env.DB_PASSWORD || "42614512",
  options: {
    encrypt: false, //Si se conecta a Azure, cambiar a true
    trustServerCertificate: true, //Cambiar a false en producción (Necesario para conexiones locales sin SSL o no insciptadas)
  },
};

export const connectDB = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("Conexión a la base de datos SQL Server establecida");
    return pool;
  } catch (error) {
    console.error("Error al conectar a la base de datos SQL Server:", error);
    throw error;
  }
};

export default config;