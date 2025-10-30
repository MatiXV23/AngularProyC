import { PersonasService } from '../../../../shared/services/personas.service';
import { Component, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonaSinId } from '../../../../shared/types/persona';
import { Router } from '@angular/router';
import { PersonasFormComponent } from '../../components/personas-form/personas-form.component';

@Component({
  selector: 'app-personas-create',
  imports: [FormsModule, PersonasFormComponent],
  templateUrl: './personas-create.page.html',
  styleUrl: './personas-create.page.css'
})
export class PersonasCreatePage {
  private router = inject(Router)
  private personasService = inject(PersonasService)

  
  roles = signal<string[]>(['admin', 'normal'])

  disabled= signal<boolean>(false)
  errorMsg = signal<string>('')



  async handleClick(persona: PersonaSinId) {

    try {
      this.disabled.set(true) 
      await this.personasService.createPersona(persona)
      this.router.navigate(['personas'])
    } catch (e:any) {
      this.errorMsg.set(e.message)
    }
    finally {
      this.disabled.set(false)
    }
    
  }
}
