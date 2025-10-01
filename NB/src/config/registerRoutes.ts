export const registerRoutes = (app: any, routes: any) => {
  app.use("/api/empresas", routes.empresaRoutes);
  app.use("/api/combustible", routes.combustibleRoutes);
  app.use("/api/impuestos", routes.impuestoRoutes);
};