import "dotenv/config";

import express from "express";
import helmet from "helmet";
import logger from "./utils/logger.js";
import { queryParser } from "express-query-parser";

import BaseError from "./base_classes/base-error.js";
import routes from "./routes.js";
import morgan from "morgan";
import corsMiddleware from "./middlewares/cors-middleware.js";
import { errorHandler } from "./utils/errorHandler.js";

class ExpressApplication {
  app;
  fileStorage;
  fileFilter;
  constructor(port) {
    this.app = express();
    this.port = port;

    this.app.use(express.json({ type: "application/json" }));
    this.app.use(queryParser({
      parseNull: true,
      parseBoolean: true,
      parseNumber: true,
    }))
    

    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(corsMiddleware);
    this.setupRoute();
    this.setupMiddlewares([
      express.json(),
      express.urlencoded(),
      errorHandler
    ]);
    this.setupLibrary([
      process.env.NODE_ENV === "development" ? morgan("dev") : "",
      helmet(),
    ]);
  }

  setupMiddlewares(middlewaresArr) {
    middlewaresArr.forEach((middleware) => {
      this.app.use(middleware);
    });
  }
  
  setupRoute() {
    this.app.get("/hello-world", (req, res) => {
      res.status(200).json({
        message: "Hello World",
      });
    });

    this.app.use("/api/", routes);

    this.app.use("/*", () => {
      throw BaseError.notFound("Route not found");
    });
  }

  setupLibrary(libraries) {
    libraries.forEach((library) => {
      if (library != "" && library != null) {
        this.app.use(library);
      }
    });
  }

  start() {
    return this.app.listen(this.port, () => {
      logger.info(`Application running on port ${this.port}`);
    });
  }
}

export default ExpressApplication;
