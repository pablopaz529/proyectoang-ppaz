import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor() { }

  
  getPeliculas(tipo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${tipo}?api_key=${this.apiKey}&language=es-ES&page=1&region=ES`);
  }
  
  // Mantenemos este por compatibilidad con el Home
  getPeliculasPopulares(): Observable<any> {
    return this.getPeliculas('popular');
  }


  getPeliculaDetalle(id:string): Observable<any> {

    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=es-ES`);

  }

  
  buscarPeliculas(texto: string): Observable<any> {
    // Usamos el endpoint /search/movie para buscar muchas más películas
    return this.http.get(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&language=es-ES&query=${texto}&page=1&include_adult=false`);
  }

  
}