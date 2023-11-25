import { Category } from "../models/CategoryModel";
import { NewCategory } from "../models/NewCategoryModel";

export type CategoryFindAllQueryParams = {
  orderBy?: string;
};

export interface ICategoryRepository {
  findAll: (query: CategoryFindAllQueryParams) => Promise<Category[]>;
  findById: (id: string) => Promise<Category | null>;
  create: (newCategory: NewCategory) => Promise<Category>;
  update: (category: Partial<Category>) => void;
  delete: (id: string) => void;
}
