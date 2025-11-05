import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { MainStore } from './shared/stores/main.store';
import { Persona } from './shared/types/persona';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front2');

  mainStore = inject(MainStore)
  authService = inject(AuthService)

  user = this.mainStore.user 

  isLogged = this.authService.isLogged

}
