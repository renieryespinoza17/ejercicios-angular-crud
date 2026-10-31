
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  edad: number;
  propietario: string;
}

@Component({
  selector: 'app-mascota',
  imports: [FormsModule],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.css'
})
export class MascotaComponent {

  mascotas: Mascota[] = [];

  nombre = '';
  especie = '';
  edad: number | null = null;
  propietario = '';

  mensaje = '';

  constructor(private router: Router) {
    if (localStorage.getItem('sesionVeterinaria') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }

    const datos = localStorage.getItem('mascotasVeterinaria');

    if (datos !== null) {
      this.mascotas = JSON.parse(datos);
    } else {
      this.mascotas = [
        {
          id: 1,
          nombre: 'Luna',
          especie: 'Gato',
          edad: 0,
          propietario: 'Ana Ejemplo'
        },
        {
          id: 2,
          nombre: 'Rocky',
          especie: 'Perro',
          edad: 3,
          propietario: 'Luis Ejemplo'
        }
      ];

      this.guardarEnLocalStorage();
    }
  }

  guardar() {
    if (
      this.nombre.trim() === '' ||
      this.especie.trim() === '' ||
      this.propietario.trim() === '' ||
      this.edad === null ||
      !Number.isInteger(this.edad) ||
      this.edad < 0
    ) {
      alert('Complete correctamente todos los campos. La edad debe ser un número entero mayor o igual a cero.');
      return;
    }

    let nuevoId = 1;

    for (const mascota of this.mascotas) {
      if (mascota.id >= nuevoId) {
        nuevoId = mascota.id + 1;
      }
    }

    const nuevaMascota: Mascota = {
      id: nuevoId,
      nombre: this.nombre.trim(),
      especie: this.especie.trim(),
      edad: this.edad,
      propietario: this.propietario.trim()
    };

    this.mascotas.push(nuevaMascota);
    this.guardarEnLocalStorage();
    this.limpiar();

    this.mensaje = 'Mascota registrada correctamente';
  }

  limpiar() {
    this.nombre = '';
    this.especie = '';
    this.edad = null;
    this.propietario = '';
  }

  guardarEnLocalStorage() {
    localStorage.setItem(
      'mascotasVeterinaria',
      JSON.stringify(this.mascotas)
    );
  }

  cerrarSesion() {
    localStorage.removeItem('sesionVeterinaria');
    this.router.navigate(['/login']);
  }
}
