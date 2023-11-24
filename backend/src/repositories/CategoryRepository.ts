import db from "../../database/client";
import { Category } from "../models/CategoryModel";
import { NewCategory } from "../models/NewCategoryModel";

import {
  CategoryFindAllQueryParams,
  ICategoryRepository,
} from "./ICategoryRepository";

class CategoryRepository implements ICategoryRepository {
  async findAll({ orderBy }: CategoryFindAllQueryParams) {
    const direction =
      orderBy?.toUpperCase() === "DESC" ? { raw: "DESC" } : { raw: "ASC" };

    const rows = await db.query<Category>`
      SELECT * FROM categories ORDER BY name ${direction}
    `;

    return rows;
  }

  async create({ name }: NewCategory) {
    const [row] = await db.query<Category>`
      INSERT INTO categories(name)
      VALUES(${name})
      RETURNING *
    `;

    return row;
  }
}

export default new CategoryRepository();
