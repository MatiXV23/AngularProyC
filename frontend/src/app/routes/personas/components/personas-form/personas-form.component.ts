import { JsonPipe } from '@angular/common';
import { Component, output, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvalidNameDirective } from '../../../../shared/validators/invalid-name.directive';
import { ExistingNameDirective } from '../../../../shared/validators/existing-name.directive';
import { PersonaSinId, Persona } from '../../../../shared/types/persona';

@Component({
  selector: 'app-personas-form',
  imports: [FormsModule, JsonPipe, InvalidNameDirective, ExistingNameDirective],
  templateUrl: './personas-form.component.html',
  styleUrl: './personas-form.component.css'
})
export class PersonasFormComponent {
  user = input<PersonaSinId | Persona>({
    username: 'Nombre',
    roles: []
  })


  roles = input.required<string[]>()

  save = output<PersonaSinId>()
  
  disabled = input<boolean>((false), {alias: 'disable'});

  errorMsg = input<string>((''), {alias: 'errorMsg'});


  async handleClick($event: any) {
    this.save.emit(this.user())

  }
}
