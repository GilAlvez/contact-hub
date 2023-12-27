import { ContactFields } from "../components/ContactForm";
import HttpClient from "../libs/HttpClient";
import ContactMapper from "../mappers/ContactMapper";

class ContactsService {
  constructor() {
    this.http = new HttpClient("http://localhost:3001");
  }

  http: HttpClient;

  async list(signal?: AbortSignal, orderBy: "ASC" | "DESC" = "ASC") {
    const contacts = await this.http.get(`/contacts?orderBy=${orderBy}`, { signal });

    return contacts.map(ContactMapper.toDomain);
  }

  async unique(id: string, signal?: AbortSignal) {
    const contact = await this.http.get(`/contacts/${id}`, { signal });

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
