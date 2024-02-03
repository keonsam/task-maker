import express, { Request, Response } from "express";
import cors from "cors";
import { httpLogger } from "./middleware/logger";
import routes from "./controllers/routes";
import { handleFatalError } from "./middleware/errorHandler";

const app = express();

app.use(cors());

// add logger to request object
app.use(httpLogger);

// Transforms the raw string of req.body into json
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Task Maker API!");
});

app.use(routes);

// Need to register this as the last middleware in the stack
app.use(handleFatalError);

export default app;
