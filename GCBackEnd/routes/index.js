import { createAccountRouter } from "./createAccountRoute.js";

export function configureRoutes(app) {
  app.use("/create-account", createAccountRouter);
  app.use(/(.*)/, (req, res) => {
    res.status(404).json({
      error: "Route not found",
    });
  });
}
