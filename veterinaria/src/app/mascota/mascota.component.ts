
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

  indiceEditar = -1;
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

  editar(indice: number) {
    this.indiceEditar = indice;

    this.nombre = this.mascotas[indice].nombre;
    this.especie = this.mascotas[indice].especie;
    this.edad = this.mascotas[indice].edad;
    this.propietario = this.mascotas[indice].propietario;

    this.mensaje = '';
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
      alert(
        'Complete todos los campos. La edad debe ser un número entero mayor o igual a cero.'
      );
      return;
    }

    if (this.indiceEditar === -1) {

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

      this.mensaje = 'Mascota registrada correctamente';

    } else {

      this.mascotas[this.indiceEditar].nombre =
        this.nombre.trim();

      this.mascotas[this.indiceEditar].especie =
        this.especie.trim();

      this.mascotas[this.indiceEditar].edad =
        this.edad;

      this.mascotas[this.indiceEditar].propietario =
        this.propietario.trim();

      this.mensaje = 'Mascota actualizada correctamente';
    }

    this.guardarEnLocalStorage();
    this.limpiar(false);
  }

  limpiar(borrarMensaje = true) {
    this.nombre = '';
    this.especie = '';
    this.edad = null;
    this.propietario = '';
    this.indiceEditar = -1;

    if (borrarMensaje) {
      this.mensaje = '';
    }
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
