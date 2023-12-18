import { CreateContactFields } from "../components/ContactForm";
import HttpClient from "../libs/HttpClient";

class ContactService {
  constructor() {
    this.http = new HttpClient("http://localhost:3001");
  }

  http: HttpClient;

  async list(orderBy: "ASC" | "DESC" = "ASC") {
    return this.http.get(`/contacts?orderBy=${orderBy}`);
  }

  async create(contact: CreateContactFields) {
    return this.http.post("/contacts", { body: JSON.stringify(contact) });
  }
}

export default new ContactService();
