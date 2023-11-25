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

  async findById(id: string) {
    const [row] = await db.query<Category>`
      SELECT * FROM categories WHERE id = ${id}
    `;

    return row;
  }

  async create({ name }: NewCategory) {
    const [row] = await db.query<Category>`
      INSERT INTO categories(name)
      VALUES(${name})
      RETURNING *
    `;

    return row;
  }

  async update(id: string, { name }: Partial<Category>) {
    await db.query`
      UPDATE categories
      SET name = ${name}
      WHERE id = ${id}
    `;
  }

  async delete(id: string) {
    await db.query`
      DELETE FROM categories WHERE id = ${id}
    `;
  }
}

export default new CategoryRepository();
