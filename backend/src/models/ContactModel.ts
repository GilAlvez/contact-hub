import { z } from "zod";

import ONLY_LETTERS_REGEX from "../utils/onlyLettersRegex";

export const ContactModel = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(3).max(200).regex(ONLY_LETTERS_REGEX, {
    message:
      "Must contain only letter characters from any language (e.g: Arabic, Kanji...) and no numbers or special symbols.",
  }),
  email: z.string().email().trim(),
  phone: z.string().min(6).max(14),
  category_id: z.string().uuid().optional(),
});

export type Contact = z.infer<typeof ContactModel>;
