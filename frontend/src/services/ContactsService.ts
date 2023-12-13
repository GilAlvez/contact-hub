import HttpClient from "../libs/HttpClient";

class ContactService {
  constructor() {
    this.http = new HttpClient("http://localhost:3001");
  }

  http: HttpClient;

  async list(orderBy: "ASC" | "DESC" = "ASC") {
    const { json } = await this.http.get(`/contacts?orderBy=${orderBy}`);

    return json();
  }
}

export default new ContactService();
