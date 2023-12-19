import { CreateContactFields } from "../components/ContactForm";
import HttpClient from "../libs/HttpClient";

class ContactsService {
  constructor() {
    this.http = new HttpClient("http://localhost:3001");
  }

  http: HttpClient;

  list(orderBy: "ASC" | "DESC" = "ASC") {
    return this.http.get(`/contacts?orderBy=${orderBy}`);
  }

  unique(id: string) {
    return this.http.get(`/contacts/${id}`);
  }

  create(contact: CreateContactFields) {
    return this.http.post("/contacts", { body: JSON.stringify(contact) });
  }
}

export default new ContactsService();
