import { Request, Response } from "express";

import { CategoryModel } from "../models/CategoryModel";
import { NewCategoryModel } from "../models/NewCategoryModel";
import CategoryRepository from "../repositories/CategoryRepository";
import validateModel from "../utils/validateModel";

export default abstract class CategoryController {
  static async index(req: Request, res: Response) {
    // Data
    const { orderBy } = req.query;

    const categories = await CategoryRepository.findAll({
      orderBy: String(orderBy),
    });

    // Success
    res.json(categories);
  }

  static async show(req: Request, res: Response) {
    // Data
    const { id } = req.params;

    const category = await CategoryRepository.findById(id);

    // Validation
    if (!category) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    // Success
    res.json(category);
  }

  static async store(req: Request, res: Response) {
    // Data
    const { name } = req.body;

    // Validation
    const error = validateModel(NewCategoryModel, { name });

    if (error) {
      res.status(400).json(error);
      return;
    }

    // Success
    const category = await CategoryRepository.create({ name });
    res.status(201).json(category);
  }

  static async update(req: Request, res: Response) {
    // Data
    const { id } = req.params;
    const { name } = req.body;

    // Validation
    const error = validateModel(CategoryModel, { id, name });

    if (error) {
      res.status(400).json(error);
      return;
    }

    // Success
    await CategoryRepository.update(id, { name });
    res.sendStatus(204);
  }

  static async delete(req: Request, res: Response) {
    // Data
    const { id } = req.params;

    // Validation
    const category = CategoryRepository.findById(id);

    if (!category) {
      res.status(404).json({ error: "Not Found" });
      return;
    }

    // Success
    await CategoryRepository.delete(id);
    res.sendStatus(204);
  }
}
