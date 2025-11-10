import 'tsconfig-paths/register';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import { connectDB } from "./config/sqlDB-DESKTOP";
import { connectDB } from "./config/sqlSomee";
import { registerRoutes } from "./config/registerRoutes";
import * as routes from "./routes"; // Importa todas las rutas de la aplicacion
import 'dotenv/config';
import { swaggerDocs } from "./config/swagger";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

//Registrar rutas
registerRoutes(app, routes);

//Conectar a la base de datos
connectDB();

//Ruta raiz
app.get("/", async (req, res) => {
  res.send("¡Backend conectado a SQL Server!");
});

// Iniciar servidor
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  swaggerDocs(app, PORT); // 👈 activamos Swagger
})