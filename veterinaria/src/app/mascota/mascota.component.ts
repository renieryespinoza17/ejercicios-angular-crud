
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  edad: number;
  propietario: string;
}

@Component({
  selector: 'app-mascota',
  imports: [],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.css'
})
export class MascotaComponent {

  mascotas: Mascota[] = [];

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

      localStorage.setItem(
        'mascotasVeterinaria',
        JSON.stringify(this.mascotas)
      );
    }
  }

  cerrarSesion() {
    localStorage.removeItem('sesionVeterinaria');
    this.router.navigate(['/login']);
  }
}
