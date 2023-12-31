import { Contact } from "../models/ContactModel";
import { NewContact } from "../models/NewContactModel";

export type ContactFindAllQueryParams = {
  orderBy?: string;
};
export interface IContactRepository {
  findAll: (query: ContactFindAllQueryParams) => Promise<Contact[]>;
  findById: (id: string) => Promise<Contact | null>;
  findByEmail: (email: string) => Promise<Contact | null>;
  create: (newContact: NewContact) => Promise<Contact>;
  update: (contact: Contact) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
