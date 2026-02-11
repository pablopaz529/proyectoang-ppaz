import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PeliculasListaComponent } from './peliculas-lista/peliculas-lista.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
  { path: 'peliculas', component: PeliculasListaComponent },
  // { path: 'contacto', component: ContactoComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Si no pone nada, ir al Home
  { path: '**', redirectTo: 'home' } // Si la ruta está mal, ir al Home
];
