import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Credenciales } from '../../shared/types/credenciales';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule],
  templateUrl: './log-in.page.html',
  styleUrl: './log-in.page.css'
})
export class LogInPage {
  private authService = inject(AuthService)
  private router = inject(Router);
  username: string = ''
  password: string = ''
  
  async handleClick() {
    const credenciales: Credenciales = {
      username: this.username,
      password: this.password
    }
    
    console.info(credenciales)
    try {
      await this.authService.logIn(credenciales)
      this.router.navigate(['personas'])
    }catch (e) {
      console.log(e)
    }
    
  }
}
