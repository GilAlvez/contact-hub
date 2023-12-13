export default class HttpClient {
  constructor(baseURL: string) {
    this.baseUrl = baseURL;
  }

  baseUrl: string;

  async get(path: string) {
    return fetch(`${this.baseUrl}${path}`);
  }
}
