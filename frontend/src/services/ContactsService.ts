import { ContactFields } from "../components/ContactForm";
import HttpClient from "../libs/HttpClient";
import ContactMapper from "../mappers/ContactMapper";

class ContactsService {
  constructor() {
    this.http = new HttpClient("http://localhost:3001");
  }

  http: HttpClient;

  async list(orderBy: "ASC" | "DESC" = "ASC") {
    const contacts = await this.http.get(`/contacts?orderBy=${orderBy}`);

    return contacts.map(ContactMapper.toDomain);
  }

  async unique(id: string) {
    const contact = await this.http.get(`/contacts/${id}`);

    return ContactMapper.toDomain(contact);
  }

  create(data: ContactFields) {
    const contact = ContactMapper.toPersistence(data);

    return this.http.post("/contacts", { body: JSON.stringify(contact) });
  }

  update(id: string, data: ContactFields) {
    const contact = ContactMapper.toPersistence(data);

    return this.http.put(`/contacts/${id}`, { body: JSON.stringify(contact) });
  }

  delete(id: string) {
    return this.http.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
