import db from "../../database/client";
import { Contact } from "../models/ContactModel";
import { NewContact } from "../models/NewContactModel";

import {
  ContactFindAllQueryParams,
  IContactRepository,
} from "./IContactRepository";

class ContactRepository implements IContactRepository {
  async findAll({ orderBy }: ContactFindAllQueryParams) {
    const direction =
      orderBy?.toUpperCase() === "DESC" ? { raw: "DESC" } : { raw: "ASC" };

    const rows = await db.query<Contact>`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      ORDER BY contacts.name ${direction}
    `;

    return rows;
  }

  async findById(id: string) {
    const [row] = await db.query<Contact>`
      SELECT contact.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = ${id}
    `;

    return row;
  }

  async findByEmail(email: string) {
    const [row] = await db.query<Contact>`
      SELECT * FROM contacts WHERE email = ${email}
    `;

    return row;
  }

  async create({ name, email, phone, category_id }: NewContact) {
    const [row] = await db.query<Contact>`
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES(${name}, ${email}, ${phone} ${category_id})
      RETURNING *
    `;

    return row;
  }

  async update({ id, name, email, phone, category_id }: Contact) {
    await db.query`
      UPDATE contacts
      SET name = ${name}, email = ${email}, phone = ${phone}, category_id = ${category_id}
      WHERE id = ${id}
    `;
  }

  async delete(id: string) {
    await db.query`
      DELETE FROM contacts WHERE id = ${id}
    `;
  }
}

export default new ContactRepository();
