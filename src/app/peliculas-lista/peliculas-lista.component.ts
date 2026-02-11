import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-peliculas-lista',
  // Quitamos standalone: true (ya es por defecto)
  imports: [CommonModule], 
  templateUrl: './peliculas-lista.component.html',
  styleUrl: './peliculas-lista.component.css'
})
export class PeliculasListaComponent implements OnInit {

  private peliculasService = inject(PeliculasService);
  private cd = inject(ChangeDetectorRef); // Para forzar el refresco
  
  peliculas: any[] = [];
  filtroActual: string = 'popular'; 

  ngOnInit(): void {
    this.cargarDatos('popular');
  }

  cargarDatos(filtro: string) {
    this.filtroActual = filtro;
    
    // TRUCO: Vaciamos la lista para que no se mezclen pelis viejas con nuevas
    this.peliculas = []; 
    
    this.peliculasService.getPeliculas(filtro).subscribe({
      next: (data: any) => {
        this.peliculas = data.results;
        console.log(`Cargadas: ${filtro}`, this.peliculas);
        this.cd.detectChanges(); // ¡Angular, pinta esto YA!
      },
      error: (err) => console.error('Error al cargar:', err)
    });
  }
}