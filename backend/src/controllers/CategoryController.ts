import { Request, Response } from "express";

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
    res.json(category);
  }
}
