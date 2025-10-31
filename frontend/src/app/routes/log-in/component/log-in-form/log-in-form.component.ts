import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Credenciales } from '../../../../shared/types/credenciales';

@Component({
  selector: 'app-log-in-form',
  imports: [FormsModule],
  templateUrl: './log-in-form.component.html',
  styleUrl: './log-in-form.component.css'
})
export class LogInFormComponent {
  credenciales: Credenciales = {
    username: '',
    password: ''
  }

  save = output<Credenciales>()

  async handleSubmit(event: any) {
    this.save.emit(this.credenciales)
  }
}
