import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, throwIfEmpty } from 'rxjs';
import { Credenciales } from '../types/credenciales';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient)

  private User: any = null

  private token:string | undefined = ''

  isLogged = signal<boolean>(false)

  getToken(){ 
    if (!this.token) { this.token = localStorage.getItem("token") ?? '' }
    return this.token
  }

  async logIn(credenciales: Credenciales){
    try {
      const token = await firstValueFrom(this.httpClient.post<{token: string}>('http://localhost:2000/auth/', credenciales))
      console.log("token: ", token)
      this.token = token.token
      this.isLogged.set(true)
      localStorage.setItem("token", token.token)
    }
    catch (e) {
      throw e
    }
  }

  async logOut(){
    this.isLogged.set(false)
    console.log("log out")
    this.token = undefined;
    localStorage.removeItem("token")
  }

  async getUser(){
    if (!this.User) { this.User = await firstValueFrom(this.httpClient.get('http://localhost:2000/auth/')) }

    return this.User
  }
}
