import crypto from "crypto";

import db from "../../database/client";
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
    const rows = await db.query<Contact>`
      SELECT * FROM contacts
    `;

    return rows;
  }

  async findById(id: string) {
    const [row] = await db.query<Contact>`
      SELECT * FROM contacts WHERE id = ${id}
    `;

    return row;
  }

  async findByEmail(email: string) {
    const [row] = await db.query<Contact>`
      SELECT * FROM contacts WHERE email = ${email}
    `;

    return row;
  }

  async create({ name, email, phone }: NewContact) {
    const [row] = await db.query<Contact>`
      INSERT INTO contacts(name, email, phone)
      VALUES(${name}, ${email}, ${phone})
      RETURNING *
    `;

    return row;
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
