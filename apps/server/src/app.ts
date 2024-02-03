import express, { Request, Response, NextFunction } from "express";
import createError, { HttpError } from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import logger from "morgan";
import { db, ENV } from "./config";
import swaggerUi from "swagger-ui-express";
import specs from "./swagger";
import apiV1Routes from "./routes/v1";

dotenv.config();

const app = express();

const port = ENV.PORT || 5500;

const allowedOrigins: Array<string> = [
  ENV.FE_BASE_URL as string,
  ENV.IS_PROD ? "" : `http://localhost:${port}`,
].filter(Boolean);

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Referrer-Policy", "no-referrer-when-downgrade"); 
  next();
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/v1", apiV1Routes);

db.sync({
  // force:true
})
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err: HttpError) => {
    console.log(err);
  });


app.use(function (_req: Request, _res: Response, next: NextFunction) {
  next(createError(404));
});

app.use(function (err: HttpError, req: Request, res: Response) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(
    `\n\nRyder Server:\n\nApi docs, open @  http://localhost:${port}/api-docs`
  );
  console.log(`\nLocal baseUrl, use @ http://localhost:${port}/api/`);
});
