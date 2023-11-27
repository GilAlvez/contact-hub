import { z } from "zod";

import { CategoryModel } from "./CategoryModel";

export const NewCategoryModel = CategoryModel.omit({ id: true });

export type NewCategory = z.infer<typeof NewCategoryModel>;
