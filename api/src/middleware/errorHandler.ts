import { NextFunction, Request, Response } from "express";
import logger from "./logger";

export function handleFatalError(
  err: Error,
  req: Request,
  res: Response,
  // The next is required
  next: NextFunction
) {
  // TODO: Expand fatal error handling middleware
  logger.fatal(err);

  // TODO: custom application errors
  // if (err instanceof ApplicationError) {
  //   res.status(err.status).json({
  //     name: err.name,
  //     message: err.message,
  //   });
  // }

  res.status(500).json({
    message: "An error occurred. Please try again later.",
  });
}
