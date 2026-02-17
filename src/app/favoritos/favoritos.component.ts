import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoritosService } from '../services/favoritos.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favoritos.component.html'
})
export class FavoritosComponent implements OnInit {
  
  private favoritosService = inject(FavoritosService);
  peliculas: any[] = [];

  ngOnInit() {
    // Cargamos las pelis guardadas al iniciar
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    this.peliculas = this.favoritosService.getFavoritos();
  }

  eliminar(id: number) {
    this.favoritosService.removeFavorito(id);
    this.cargarFavoritos(); // Recargamos la lista para que desaparezca la borrada
  }
}