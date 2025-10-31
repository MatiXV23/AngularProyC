import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Persona } from '../../../../shared/types/persona';
import { PersonasService } from '../../../../shared/services/personas.service';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-personas-list',
  imports: [UpperCasePipe, RouterLink],
  templateUrl: './personas-list.page.html',
  styleUrl: './personas-list.page.css'
})
export class PersonasListPage implements OnInit{
  private personaService: PersonasService = inject(PersonasService)
  personas = signal<Persona[]>([])

  usernames = computed(()=> this.personas().map((p) => p.username).join(','))

  private loggear = effect(() => {
    const cant = this.personas().length
    console.log('Cant: ', cant)
  })

  async deleteUser(event: any, id_persona: number) {

  }

  async ngOnInit() {
    const personas = await this.personaService.getPersonas()
    this.personas.set(personas)
    console.log(this.personas)
  }
}
