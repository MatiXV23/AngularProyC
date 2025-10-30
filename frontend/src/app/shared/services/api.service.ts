import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private token: string = "";

  private baserecurso: string = "http://localhost:2000/";

  setToken(nuevoToken: string) {
    this.token = nuevoToken;
    localStorage.setItem('token', nuevoToken)
    if (nuevoToken === undefined) localStorage.removeItem('token')
  }

  hayToken() {
    this.token = localStorage.getItem('token')?? ""
    console.log({ token: !!this.token });
    return !!this.token;
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      "content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request(method: string, endpoint: string, data = null) {
    const options: RequestInit = {
      method,
      headers: this.getHeaders(),
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(this.baserecurso + endpoint, options);

    if (!response.ok) {
      let mensajeError = `Error ${response.status}`;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const errorJson = await response.json();
        if (errorJson.message) {
          mensajeError = errorJson.message;
        }
      }

      if (response.status >= 400 && response.status < 500)
        throw new Error(`Error del cliente: ${mensajeError}`);

      if (response.status >= 500)
        throw new Error(`Error del servidor: ${mensajeError}`);

      throw new Error(mensajeError);
    }

    // Manejo especial para 204 No content
    if (response.status === 204) {
      return;
    }

    // Si hay contenido, lo parseamos
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    // Si no es JSON, devolvemos texto plano
    return await response.text();
  }

  async get(endpoint: string){
    return await this.request("GET", endpoint)
  }

  async put(endpoint: string, data = null){
    return await this.request("PUT", endpoint, data)
  }

  async post(endpoint: string, data = null){
    return await this.request("POST", endpoint, data)
  }

  async delete(endpoint: string){
    return await this.request("PUT", endpoint)
  }
}
