import { Category } from "../models/CategoryModel";
import { NewCategory } from "../models/NewCategoryModel";

export type CategoryFindAllQueryParams = {
  orderBy?: string;
};

export interface ICategoryRepository {
  findAll: (query: CategoryFindAllQueryParams) => Promise<Category[]>;
  create: (contact: NewCategory) => Promise<Category>;
}
