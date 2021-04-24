import express, {
  NextFunction,
  Request as ExRequest,
  Response as ExResponse,
} from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "../../build/routes";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { ValidateError } from "tsoa";

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

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error 2",
    });
  }

  next();
});
