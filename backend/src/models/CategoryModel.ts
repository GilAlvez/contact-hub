import { z } from "zod";

export const CategoryModel = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(25),
});

export type Category = z.infer<typeof CategoryModel>;
