import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, throwIfEmpty } from 'rxjs';
import { Credenciales } from '../types/credenciales';
import { MainStore } from '../stores/main.store';
import { Persona } from '../types/persona';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient)

  private mainStore = inject(MainStore)


  isLogged = signal<boolean>(false)


  async logIn(credenciales: Credenciales){
    try {
      const {token} = await firstValueFrom(this.httpClient.post<{token: string}>('http://localhost:2000/auth/', credenciales))
      console.log("token: ", token)
      this.mainStore.token = token

      this.isLogged.set(true)
      localStorage.setItem("token", token)

      await this.getUser()
    }
    catch (e) {
      throw e
    }
  }

  async logOut(){
    this.isLogged.set(false)
    console.log("log out")

    this.mainStore.token = undefined;

    localStorage.removeItem("token")
  }

  async getUser(){
    const user = await firstValueFrom(this.httpClient.get<Persona>('http://localhost:2000/auth/')) 

    this.mainStore.user.set(user)
  }
}
