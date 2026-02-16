import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PeliculasListaComponent } from './peliculas-lista/peliculas-lista.component';
import { PeliculaDetalleComponent } from './pelicula-detalle/pelicula-detalle.component';
import { ContactoComponent } from './contacto/contacto.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
  { path: 'peliculas', component: PeliculasListaComponent },
  { path: 'pelicula/:id', component: PeliculaDetalleComponent },
   { path: 'contacto', component: ContactoComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Si no pone nada, ir al Home
  { path: '**', redirectTo: 'home' } // Si la ruta está mal, ir al Home
];
