import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Credenciales } from '../types/credenciales';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient)

  private User: any = null

  private token:string = ''

  getToken(){ 
    if (!this.token) { this.token = localStorage.getItem("token") ?? '' }
    return this.token
  }

  async logIn(credenciales: Credenciales){
    const token = await firstValueFrom(this.httpClient.post<string>('http://localhost:2000/auth/', credenciales))
    console.log("token: ", token)
    this.token = token
    localStorage.setItem("token", token)
  }

  async logOut(){
    
  }

  async getUser(){
    if (!this.User) { this.User = await firstValueFrom(this.httpClient.get('http://localhost:2000/auth/')) }

    return this.User
  }
}
