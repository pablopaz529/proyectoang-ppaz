import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PeliculasListaComponent } from './peliculas-lista/peliculas-lista.component';
import { PeliculaDetalleComponent } from './pelicula-detalle/pelicula-detalle.component';
import { ContactoComponent } from './contacto/contacto.component';
import { FavoritosComponent } from './favoritos/favoritos.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'peliculas', component: PeliculasListaComponent },
    
    // RUTA DINÁMICA: ':id' es una variable que capturaremos en el componente detalle.
    // Esto nos permite reutilizar el mismo componente para cualquier película.
    { path: 'pelicula/:id', component: PeliculaDetalleComponent },
    
    { path: 'contacto', component: ContactoComponent },
    { path: 'favoritos', component: FavoritosComponent },
    
    // REDIRECCIONES:
    // 'pathMatch: full' asegura que solo redirija si la URL está totalmente vacía.
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    
    // WILDCARD (**): Captura cualquier ruta no definida y redirige al home (manejo de errores 404).
    { path: '**', redirectTo: 'home' } 
];
