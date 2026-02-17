import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser'; 

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  private fb = inject(FormBuilder);

  // Definimos el formulario con los mismos nombres que pusimos en EmailJS
  // nombre, email, asunto, mensaje
  formularioContacto: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    asunto: ['', [Validators.required]],
    mensaje: ['', [Validators.required, Validators.minLength(10)]]
  });

  async enviarFormulario() {
    // Si el formulario está mal, mostramos los errores en rojo y paramos
    if (this.formularioContacto.invalid) {
      this.formularioContacto.markAllAsTouched();
      return;
    }

    try {
      // Preparamos los datos del formulario
      // Al ser un FormGroup, .value ya devuelve un objeto: { nombre: '...', email: '...', ... }
      // que coincide EXACTAMENTE con las variables {{nombre}}, {{email}} de la plantilla.
      const templateParams = this.formularioContacto.value;

      // 3. Enviamos el correo usando las credenciales de EmailJS
      await emailjs.send(
        'email_service',      
        'template_u42t5sb',     
        templateParams,
        'U-mjCrC3V-dfK64u8'       
      );

      
      alert('¡Mensaje enviado correctamente! Revisa tu correo de administrador.');
      this.formularioContacto.reset(); 

    } catch (error) {
      
      console.error('Error al enviar:', error);
      alert('Hubo un error al enviar el mensaje. Revisa la consola o tus credenciales.');
    }
  }

  // Función auxiliar para mostrar errores en el HTML
  tieneError(campo: string): boolean {
    const control = this.formularioContacto.get(campo);
    return control ? (control.invalid && control.touched) : false;
  }
}