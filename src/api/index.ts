import express, { Request as ExRequest, Response as ExResponse } from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "../../build/routes";
import swaggerUi from "swagger-ui-express";
import path from "path";

export const app = express();

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(
      await import(path.join(__dirname, "../../build/swagger.json"))
    )
  );
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

RegisterRoutes(app);
