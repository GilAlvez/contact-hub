import { Request, Response } from "express";

import { ContactModel } from "../models/ContactModel";
import { NewContactModel } from "../models/NewContactModel";
import ContactRepository from "../repositories/ContactRepository";

export default abstract class ContactController {
  static async index(req: Request, res: Response): Promise<void> {
    // Data
    const contacts = await ContactRepository.findAll();

    // Success
    res.json(contacts);
  }

  static async show(req: Request, res: Response): Promise<void> {
    // Data
    const { id } = req.params;
    const contact = await ContactRepository.findById(id);

    // Validation
    if (!contact) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    // Success
    res.json(contact);
  }

  static async store(req: Request, res: Response): Promise<void> {
    // Data
    const { name, email, phone } = req.body;

    // Validation
    const validation = NewContactModel.safeParse({ name, email, phone });

    if (!validation.success) {
      res.status(400).json({
        error: "Invalid properties",
        details: validation.error.issues.map((issue) => ({
          field: issue.path,
          message: issue.message,
        })),
      });
      return;
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      res.status(400).json({ error: "This email is already in use" });
      return;
    }

    // Success
    await ContactRepository.create({ name, email, phone });
    res.sendStatus(204);
  }

  static async update(req: Request, res: Response): Promise<void> {
    // Data
    const { id } = req.params;
    const { name, email, phone } = req.body;

    // Validation
    const validation = ContactModel.safeParse({ id, name, email, phone });

    if (!validation.success) {
      res.status(400).json({
        error: "Invalid properties",
        details: validation.error.issues.map((issue) => ({
          field: issue.path,
          message: issue.message,
        })),
      });
      return;
    }

    const contactById = await ContactRepository.findById(id);

    if (!contactById) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    const contactByEmail = await ContactRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      res.status(400).json({ error: "This e-mail is already in use" });
      return;
    }

    // Success
    await ContactRepository.update({ id, name, email, phone });
    res.sendStatus(204);
  }

  static async delete(req: Request, res: Response): Promise<void> {
    // Data
    const { id } = req.params;

    const contact = await ContactRepository.findById(id);

    // Validation
    if (!contact) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    // Success
    await ContactRepository.delete(id);
    res.sendStatus(204);
  }
}
