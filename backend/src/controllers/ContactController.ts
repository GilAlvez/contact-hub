import { Request, Response } from "express";

import { NewContactModel } from "../models/NewContactModel";
import ContactRepository from "../repositories/ContactRepository";

export default abstract class ContactController {
  static async index(req: Request, res: Response): Promise<void> {
    const contacts = await ContactRepository.findAll();

    res.json(contacts);
  }

  static async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const contact = await ContactRepository.findById(id);

    if (contact) {
      res.json(contact);
    }

    res.status(404).json({ error: "Not found" });
  }

  static async store(req: Request, res: Response): Promise<void> {
    const { name, email, phone } = req.body;

    const newContact = NewContactModel.parse({ name, email, phone });

    const contactExists = await ContactRepository.findByEmail(newContact.email);

    if (!contactExists) {
      await ContactRepository.create(newContact);

      res.sendStatus(204);
    }
    res.status(400).json({ error: "This email is already in use" });
  }

  static async update(req: Request, res: Response): Promise<void> {
    res.send("");
  }

  static async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const contact = await ContactRepository.findById(id);

    if (contact) {
      await ContactRepository.delete(id);
      res.sendStatus(204);
    }

    res.status(404).json({ error: "Not found" });
  }
}
