import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  // Importamos RouterLink para que los enlaces del pie de página ("Inicio", "Contacto")
  // funcionen como navegación SPA (sin recargar) y no como enlaces web normales.
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {

}
