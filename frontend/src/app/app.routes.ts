import { Routes } from '@angular/router';
import { HomePage } from './routes/home/home.page';
import { LogInPage } from './routes/log-in/log-in.page';
import { isLoggedGuard } from './core/guards/is-logged-guard';



export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },

    {
        path: 'home', component: HomePage, title: 'home'
    },

    {
        path: 'login', component: LogInPage, title: 'Log In'
    },

    {
        path: 'personas',
        canActivate: [isLoggedGuard],
        loadComponent: async () => (await import('./routes/personas/pages/personas-list/personas-list.page')).PersonasListPage,
        title: 'Personas',
    },

    {
        path: 'personas/crear',
        loadComponent: async () => (await import('./routes/personas/pages/personas-create/personas-create.page')).PersonasCreatePage,
        title: 'Crear Persona'
    },

    {
        path: 'personas/edit/:id_persona',
        loadComponent: async () => (await import('./routes/personas/pages/personas-modify/personas-modify.page')).PersonasModifyPage,
        title: 'Crear Persona'
    },

    {
        path: '**',
        loadComponent: () => import('./routes/not-found/not-found.page').then((m)=> m.NotFoundPage),
        title: 'No Encontrado'
    },

];
