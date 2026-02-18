import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PeliculasService } from '../services/peliculas.service';
import { FavoritosService } from '../services/favoritos.service'; 

@Component({
  selector: 'app-pelicula-detalle',
  standalone: true, 
  imports: [CommonModule, RouterLink],
  templateUrl: './pelicula-detalle.component.html',
  styleUrl: './pelicula-detalle.component.css',
})
export class PeliculaDetalleComponent implements OnInit {

  private ruta = inject(ActivatedRoute); //Leer URL
  private peliculasService = inject(PeliculasService);
  private favoritosService = inject(FavoritosService); 
  private cd = inject(ChangeDetectorRef);

  pelicula: any;
  esFavorito: boolean = false; 

  ngOnInit() {
    // Suscripción a los parámetros de la ruta.
    // Si la URL cambia de /pelicula/1 a /pelicula/2, esto se ejecuta de nuevo.
    this.ruta.params.subscribe(params => {
      const id = params['id'];
      
      this.peliculasService.getPeliculaDetalle(id).subscribe({
        next: (data) => {
          this.pelicula = data;
          
          // Comprobamos en el servicio si esta película ya está en favoritos
          // para pintar el corazón lleno o vacío al cargar.
          this.esFavorito = this.favoritosService.isFavorito(this.pelicula.id);
          
          this.cd.detectChanges(); 
        },
        error: (err) => console.error('Error al cargar detalle:', err)
      });
    });
  }

  // FUNCIÓN DEL BOTÓN
  toggleFavorito() {
    if (this.esFavorito) {
      this.favoritosService.removeFavorito(this.pelicula.id);
      this.esFavorito = false;
    } else {
      this.favoritosService.addFavorito(this.pelicula);
      this.esFavorito = true;
    }
  }
}