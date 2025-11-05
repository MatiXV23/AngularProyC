import { Injectable } from '@angular/core';
import { Persona } from '../types/persona';

@Injectable({
  providedIn: 'root'
})
export class MainStore {
  token: string | undefined = ''
  user?: Persona


  getToken(){ 
    if (!this.token) { this.token = localStorage.getItem("token") ?? '' }
    return this.token
  }
}
