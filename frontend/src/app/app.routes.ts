import { Routes } from '@angular/router';
import { HomePage } from './routes/home/home.page';
import { LogInPage } from './routes/log-in/log-in.page';



export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },

    {
        path: 'home', component: LogInPage, title: 'home'
    },

    {
        path: 'personas',
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
