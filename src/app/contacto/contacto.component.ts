import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  private fb = inject(FormBuilder);
  private peliculasService = inject(PeliculasService);
  
  formularioContacto: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    asunto: ['', [Validators.required]],
    mensaje: ['', [Validators.required, Validators.minLength(10)]]
  });

  enviarFormulario() {
    if (this.formularioContacto.invalid) {
      this.formularioContacto.markAllAsTouched();
      return;
    }

    const datos = this.formularioContacto.value;

    this.peliculasService.enviarMensajeContacto(datos).subscribe({
      next: (resp) => {
        alert('¡Gracias! Tu mensaje ha sido enviado correctamente.');
        this.formularioContacto.reset();
      },
      error: (err) => {
        alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
      }
    });
  }

  tieneError(campo: string): boolean {
    const control = this.formularioContacto.get(campo);
    return control ? (control.invalid && control.touched) : false;
  }
}