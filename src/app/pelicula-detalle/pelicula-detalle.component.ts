import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-pelicula-detalle',
  imports: [CommonModule, RouterLink],
  templateUrl: './pelicula-detalle.component.html',
  styleUrl: './pelicula-detalle.component.css',
})
export class PeliculaDetalleComponent implements OnInit {

  private ruta = inject(ActivatedRoute);

  private peliculasService = inject(PeliculasService)

  private cd = inject(ChangeDetectorRef)

  pelicula:any;

  ngOnInit() {
    this.ruta.params.subscribe(params => {
      const id = params['id'];
      
      this.peliculasService.getPeliculaDetalle(id).subscribe({
        next: (data) => {
          this.pelicula = data;
          console.log('Detalle cargado:', this.pelicula);
          this.cd.detectChanges(); 
        },
        error: (err) => console.error('Error al cargar detalle:', err)
      });
    });
  }



}
