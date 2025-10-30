import { Component, inject, input, OnInit, resource, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PersonasService } from '../../../../shared/services/personas.service';
import { Persona, PersonaSinId } from '../../../../shared/types/persona';
import { PersonasFormComponent } from '../../components/personas-form/personas-form.component';

@Component({
  selector: 'app-personas-modify',
  imports: [PersonasFormComponent],
  templateUrl: './personas-modify.page.html',
  styleUrl: './personas-modify.page.css'
})
export class PersonasModifyPage{

 
  private router = inject(Router)
  private personasService = inject(PersonasService)
  
  id_persona = input.required<string>()

  roles = signal<string[]>(['admin', 'normal'])

  user = resource({
    params: () => ({id_persona: this.id_persona()}),
    loader: ({params}) => (this.personasService.getPersonaById(Number(params.id_persona)))
  })

  disabled= signal<boolean>(false)
  errorMsg = signal<string>('')


  async handleClick(persona: PersonaSinId) {

    try {
      this.disabled.set(true) 
      await this.personasService.updatePersona(this.user.value()!)
      this.router.navigate(['personas'])
    } catch (e:any) {
      this.errorMsg.set(e.message)
    }
    finally {
      this.disabled.set(false)
    }
    
  }
}
