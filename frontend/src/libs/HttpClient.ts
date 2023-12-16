import APIError from "../errors/APIError";

export default class HttpClient {
  constructor(baseURL: string) {
    this.baseUrl = baseURL;
  }

  baseUrl: string;

  async get(path: string) {
    const response = await fetch(`${this.baseUrl}${path}`);

    let body = null;
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("json")) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError(body?.error ?? `${response.status} - ${response.statusText}`);
  }
}
