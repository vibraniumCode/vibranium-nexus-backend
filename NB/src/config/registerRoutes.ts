export const registerRoutes = (app: any, routes: any) => {
  app.use("/api/auth", routes.authRoutes); // Ruta de autenticación
  app.use("/api/empresas", routes.empresaRoutes);
  app.use("/api/combustible", routes.combustibleRoutes);
  app.use("/api/impuestos", routes.impuestoRoutes);
  app.use("/api/clientes", routes.clienteRoutes);
  app.use("/api/tickets", routes.ticketsRoutes);
};