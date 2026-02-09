import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- IMPORTANTE: Para que funcione el bucle *ngFor
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // <--- Si no ponemos esto, el HTML no entenderá el bucle
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  private peliculasService = inject(PeliculasService);
  
  // Aquí guardaremos las pelis
  peliculas: any[] = [];

  ngOnInit(): void {
    // Cuando arranque el componente, pedimos los datos
    this.peliculasService.getPeliculasPopulares().subscribe({
      next: (data: any) => {
        this.peliculas = data.results;
        console.log('Películas cargadas:', this.peliculas); // Mira la consola del navegador (F12) para ver si llegan
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}