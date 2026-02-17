import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  
  private key = 'mis_favoritos_filmoteca';

  // Obtener todas las películas guardadas
  getFavoritos(): any[] {
    const datos = localStorage.getItem(this.key);
    return datos ? JSON.parse(datos) : [];
  }

  // Añadir una película
  addFavorito(pelicula: any) {
    const favoritos = this.getFavoritos();
    // Evitamos duplicados con .find
    if (!favoritos.find(p => p.id === pelicula.id)) {
      favoritos.push(pelicula);
      this.guardar(favoritos);
    }
  }

  // Eliminar una película
  removeFavorito(id: number) {
    let favoritos = this.getFavoritos();
    // FILTRADO: Creamos un nuevo array excluyendo la película que queremos borrar.
    favoritos = favoritos.filter(p => p.id !== id);
    this.guardar(favoritos);
  }

  // Comprobar si una película ya es favorita (para pintar el corazón)
  isFavorito(id: number): boolean {
    const favoritos = this.getFavoritos();
    return favoritos.some(p => p.id === id);
  }

  // Método auxiliar para convertir el array a string y guardarlo en el navegador.
  private guardar(lista: any[]) {
    localStorage.setItem(this.key, JSON.stringify(lista));
  }
}