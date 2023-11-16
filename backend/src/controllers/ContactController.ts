import { Request, Response } from "express";

export default abstract class ContactController {
  static index(req: Request, res: Response): void {
    res.send("Hello World");
  }

  static show(req: Request, res: Response): void {
    res.send("");
  }

  static store(req: Request, res: Response): void {
    res.send("");
  }

  static update(req: Request, res: Response): void {
    res.send("");
  }

  static delete(req: Request, res: Response): void {
    res.send("");
  }
}
