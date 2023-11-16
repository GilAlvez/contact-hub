import { z } from "zod";

import onlyLettersRegex from "../utils/onlyLettersRegex";

export const ContactModel = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .trim()
    .min(3, "Contact name must have min 3 characters")
    .max(200, "Contact name must have max 200 characters")
    .regex(onlyLettersRegex, {
      message:
        "Contact name must contain only letter characters from any language (e.g: Arabic, Kanji...) and no numbers or special symbols.",
    }),
  email: z.string().email().trim(),
  phone: z
    .number()
    .min(6, "Contact phone must have min 6 digits")
    .max(14, "Contact phone must have max 14 digits"),
});

export type TContactModel = z.infer<typeof ContactModel>;
