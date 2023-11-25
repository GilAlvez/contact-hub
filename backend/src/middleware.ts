import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

export default abstract class Middleware {
  static json = express.json();

  static errorHandler = (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    console.log("HELLO");
    res.sendStatus(500);
  };
}
