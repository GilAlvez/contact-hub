import { AnyZodObject } from "zod";

export default function validateModel<T = unknown>(
  schema: AnyZodObject,
  data: T,
) {
  const validation = schema.safeParse(data);
  if (!validation.success) {
    return {
      error: "Invalid schema",
      details: validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    };
  }
  return null;
}
