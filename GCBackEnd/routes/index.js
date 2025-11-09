import { createAccountRouter } from "./createAccountRoute.js";
import { loginRouter } from "./loginRoute.js";

export function configureRoutes(app) {
  app.use("/login", loginRouter);
  app.use("/create-account", createAccountRouter);
  app.use(/(.*)/, (req, res) => {
    res.status(404).json({
      error: "Route not found",
    });
  });
}
