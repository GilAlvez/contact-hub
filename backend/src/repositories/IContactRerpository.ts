import { Contact } from "../models/ContactModel";
import { NewContact } from "../models/NewContactModel";

export interface IContactRepository {
  findAll: () => Promise<Contact[]>;
  findById: (id: string) => Promise<Contact | null>;
  findByEmail: (email: string) => Promise<Contact | null>;
  create: (contact: NewContact) => void;
  update: (contact: Contact) => void;
  delete: (id: string) => Promise<void>;
}
