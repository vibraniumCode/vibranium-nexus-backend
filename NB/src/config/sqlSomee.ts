import sql from "mssql";

const config: sql.config = {
  server: "NexusDB.mssql.somee.com", // Servidor en Somee
  database: "NexusDB", // Nombre de la base de datos
  user: "mlopezdev_SQLLogin_1", // Usuario de la BD 
  password: "xb998oe6pl", // La contraseña que tienes en Somee
  options: {
    encrypt: false, // Somee no requiere encriptación SSL
    trustServerCertificate: true, // Para evitar problemas de certificados
  },
};

export const connectDB = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("Conexión exitosa a SQL Server en Somee");
    return pool;
  } catch (error) {
    console.error("Error al conectar a SQL Server:", error);
    throw error;
  }
};

export default config;
