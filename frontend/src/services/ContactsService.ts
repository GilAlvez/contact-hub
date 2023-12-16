import HttpClient from "../libs/HttpClient";

class ContactService {
  constructor() {
    this.http = new HttpClient("http://localhost:3001");
  }

  http: HttpClient;

  async list(orderBy: "ASC" | "DESC" = "ASC") {
    return this.http.get(`/contacts?orderBy=${orderBy}`);
  }
}

export default new ContactService();
