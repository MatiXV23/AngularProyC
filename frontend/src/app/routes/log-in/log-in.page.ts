import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Credenciales } from '../../shared/types/credenciales';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInFormComponent } from './component/log-in-form/log-in-form.component';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, LogInFormComponent],
  templateUrl: './log-in.page.html',
  styleUrl: './log-in.page.css'
})
export class LogInPage {
  private authService = inject(AuthService)
  private router = inject(Router);

  async handleClick(credenciales: Credenciales) {
    console.info(credenciales)
    try {
      await this.authService.logIn(credenciales)
      this.router.navigate(['personas'])
    }catch (e) {
      console.log(e)
    }
    
  }
}
