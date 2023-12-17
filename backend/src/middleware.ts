import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

export default abstract class Middleware {
  static CORS = (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Max-Age", "15");
    next();
  };

  static json = express.json();

  static errorHandler = (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    console.log(res);
    res.sendStatus(500);
  };
}
