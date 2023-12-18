import HttpClient from "../libs/HttpClient";

class CategoriesService {
  constructor() {
    this.http = new HttpClient("http://localhost:3001");
  }

  http: HttpClient;

  async list() {
    return this.http.get("/categories");
  }
}

export default new CategoriesService();
