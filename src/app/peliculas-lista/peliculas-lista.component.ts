import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasService } from '../services/peliculas.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-peliculas-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './peliculas-lista.component.html',
  styleUrl: './peliculas-lista.component.css'
})
export class PeliculasListaComponent implements OnInit {

  private peliculasService = inject(PeliculasService);
  private cd = inject(ChangeDetectorRef);
  
  // 'peliculasOriginales' actúa como caché para restaurar la lista si borramos la búsqueda.
  peliculasOriginales: any[] = []; 
  peliculas: any[] = []; 
  filtroActual: string = 'popular'; 
  textoBusqueda: string = ''; 

  ngOnInit(): void {
    this.cargarDatos('popular');
  }

  cargarDatos(filtro: string) {
    this.filtroActual = filtro;
    this.peliculas = []; 
    // Limpiamos el buscador si cambiamos de categoría con los botones
    this.textoBusqueda = ''; 
    
    this.peliculasService.getPeliculas(filtro).subscribe({
      next: (data: any) => {
        this.peliculasOriginales = data.results; 
        // Creamos una copia ([...]) para no modificar el array original al ordenar.
        this.peliculas = [...this.peliculasOriginales]; 
        this.cd.detectChanges();
      },
      error: (err) => console.error('Error al cargar:', err)
    });
  }

  // LÓGICA DE BÚSQUEDA HÍBRIDA
  buscar(evento: any) {
    const texto = evento.target.value; 

    if (texto.trim() === '') {
      // Si el input está vacío, restauramos las películas de la categoría actual.
      this.peliculas = [...this.peliculasOriginales];
    } else {
      // Si hay texto, hacemos una petición a la API para buscar en TODA la base de datos.
      this.peliculasService.buscarPeliculas(texto).subscribe({
        next: (data: any) => {
          this.peliculas = data.results; 
          this.cd.detectChanges();
        },
        error: (err) => console.error('Error en la búsqueda:', err)
      });
    }
  }

  // ORDENACIÓN EN CLIENTE: Ordenamos el array que ya tenemos en memoria.
  ordenar(criterio: string) {
    if (criterio === 'titulo') {
      // 'localeCompare' asegura que se ordenen bien los acentos y ñ.
      this.peliculas.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criterio === 'puntuacion') {
      // Resta aritmética para orden descendente (mayor a menor).
      this.peliculas.sort((a, b) => b.vote_average - a.vote_average);
    }
  }
}