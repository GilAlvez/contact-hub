import HttpClient from "../libs/HttpClient";
import CategoryMapper from "../mappers/CategoryMapper";

class CategoriesService {
  constructor() {
    this.http = new HttpClient("http://localhost:3001");
  }

  http: HttpClient;

  async list() {
    const categories = await this.http.get("/categories");

    return categories.map(CategoryMapper.toDomain);
  }
}

export default new CategoriesService();
