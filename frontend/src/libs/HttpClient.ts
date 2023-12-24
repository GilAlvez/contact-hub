import APIError from "../errors/APIError";

export default class HttpClient {
  constructor(baseURL: string) {
    this.baseUrl = baseURL;
  }

  baseUrl: string;

  get(path: string, options?: RequestInit) {
    return this.req(path, {
      method: "GET",
      ...options,
    });
  }

  post(path: string, options?: RequestInit) {
    return this.req(path, {
      method: "POST",
      ...options,
    });
  }

  put(path: string, options?: RequestInit) {
    return this.req(path, {
      method: "PUT",
      ...options,
    });
  }

  delete(path: string, options?: RequestInit) {
    return this.req(path, {
      method: "DELETE",
      ...options,
    });
  }

  /* global RequestInit */
  private async req(path: string, options?: RequestInit) {
    const headers = new Headers();

    if (options?.body) {
      headers.append("Content-Type", "application/json");
    }

    if (options?.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: options?.method,
      body: options?.body,
      headers,
    });

    let body = null;
    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("json")) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError(body?.error ?? `${response.status} - ${response.statusText}`);
  }
}
