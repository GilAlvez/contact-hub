import { z } from "zod";

import { ContactModel } from "./ContactModel";

export const NewContactModel = ContactModel.omit({ id: true });

export type NewContact = z.infer<typeof NewContactModel>;
