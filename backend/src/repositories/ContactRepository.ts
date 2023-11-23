import db from "../../database/client";
import { Contact } from "../models/ContactModel";
import { NewContact } from "../models/NewContactModel";

import { FindAllQueryParams, IContactRepository } from "./IContactRerpository";

class ContactRepository implements IContactRepository {
  async findAll({ orderBy }: FindAllQueryParams) {
    const direction =
      orderBy?.toUpperCase() === "DESC" ? { raw: "DESC" } : { raw: "ASC" };

    const rows = await db.query<Contact>`
      SELECT * FROM contacts ORDER BY name ${direction}
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

  async update({ id, name, email, phone }: Contact) {
    const [row] = await db.query`
      UPDATE contacts
      SET name = ${name}, email = ${email}, phone = ${phone}
      WHERE id = ${id}
    `;

    return row;
  }

  async delete(id: string) {
    await db.query`
      DELETE FROM contacts WHERE id = ${id}
    `;
  }
}

export default new ContactRepository();
