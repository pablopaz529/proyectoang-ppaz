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
  private cd = inject(ChangeDetectorRef); // <--- Inyectamos el detector
  
  peliculas: any[] = [];

  ngOnInit(): void {
    this.peliculasService.getPeliculasPopulares().subscribe({
      next: (data: any) => {
        this.peliculas = data.results;
        console.log('Datos recibidos:', this.peliculas);
        
        this.cd.detectChanges(); // <---  ¡Angular, despierta y pinta esto ya!
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}