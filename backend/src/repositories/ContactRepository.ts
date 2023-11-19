import crypto from "crypto";

import { Contact } from "../models/ContactModel";
import { NewContact } from "../models/NewContactModel";

import { IContactRepository } from "./IContactRerpository";

let contacts: Contact[] = [
  {
    id: crypto.randomUUID(),
    name: "Fulano",
    email: "fulano@mail.com",
    phone: "123123123",
  },
];

class ContactRepository implements IContactRepository {
  async findAll() {
    return contacts ?? [];
  }

  async findById(id: string) {
    const contact = contacts.find((item) => item.id === id);

    if (contact) return contact;

    return null;
  }

  async findByEmail(email: string) {
    const contact = contacts.find((item) => item.email === email);

    if (contact) return contact;

    return null;
  }

  async create({ email, name, phone }: NewContact) {
    const newContact: Contact = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
  }

  async update(contact: Contact) {
    contacts = contacts.map((item) =>
      item.id === contact.id ? contact : item,
    );
  }

  async delete(id: string) {
    contacts = contacts.filter((contact) => contact.id !== id);
  }
}

export default new ContactRepository();
