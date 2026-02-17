import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'; // <--- NUEVO: Añade ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { PeliculasService } from '../services/peliculas.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  private peliculasService = inject(PeliculasService);

  // Herramienta para forzar manualmente la actualización de la vista.
  // A veces, tras una operación asíncrona compleja, Angular necesita un "empujón" para repintar.
  private cd = inject(ChangeDetectorRef); 
  
  peliculas: any[] = [];

  ngOnInit(): void {
    this.peliculasService.getPeliculasPopulares().subscribe({
      next: (data: any) => {
        this.peliculas = data.results;
        console.log('Datos recibidos:', this.peliculas);

        // Forzamos la detección de cambios para asegurar que el Carrusel 
        // reciba las imágenes inmediatamente y no se quede en blanco.
        this.cd.detectChanges(); 
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}