import { Injectable, OnInit, inject } from '@angular/core';
import { Persona, PersonaSinId } from '../types/persona';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PersonasService {
  private httpClient: HttpClient = inject(HttpClient)

  async getPersonas(): Promise<Persona[]> {
    return await firstValueFrom(this.httpClient.get<Persona[]>('http://localhost:2000/personas/'))
  }

  async getPersonaById(id_persona: number): Promise<Persona> {
    return await firstValueFrom(this.httpClient.get<Persona>(`http://localhost:2000/personas/${id_persona}`))
  }

  async updatePersona(persona: Persona): Promise<void>{
    const personaSinId: PersonaSinId = {
      username: persona.username,
      roles: persona.roles
    }
    try {
      await firstValueFrom(this.httpClient.put(`http://localhost:2000/personas/${persona.id_persona}`, personaSinId))
    } catch (err: any) {
      if (err.status == 0) throw new Error(err.message)

      throw new Error(err.error.message)
    }
  }

  async createPersona(persona: PersonaSinId) {
    try {
      return await firstValueFrom(this.httpClient.post('http://localhost:2000/personas/', persona))
    } catch (err: any) {
      if (err.status == 0) throw new Error(err.message)

      throw new Error(err.error.message)
    }
    
  }
}
