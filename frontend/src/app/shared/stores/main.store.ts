import { Injectable, signal } from '@angular/core';
import { Persona } from '../types/persona';

@Injectable({
  providedIn: 'root'
})
export class MainStore {
  token: string | undefined = ''
  user = signal<Persona | undefined>(undefined) 


  getToken(){ 
    if (!this.token) { this.token = localStorage.getItem("token") ?? '' }
    return this.token
  }
}
