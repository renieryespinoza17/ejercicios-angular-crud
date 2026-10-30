
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Estudiante {
  id: number;
  cuenta: string;
  nombre: string;
  carrera: string;
  fechaIngreso: string;
}

@Component({
  selector: 'app-estudiante',
  imports: [FormsModule],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent {

  estudiantes: Estudiante[] = [];

  cuenta = '';
  nombre = '';
  carrera = '';
  fechaIngreso = '';

  mensaje = '';

  constructor(private router: Router) {
    if (localStorage.getItem('sesionEstudiantes') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }

    const datos = localStorage.getItem('registrosEstudiantes');

    if (datos !== null) {
      this.estudiantes = JSON.parse(datos);
    }
  }

  guardar() {
    if (
      this.cuenta.trim() === '' ||
      this.nombre.trim() === '' ||
      this.carrera.trim() === '' ||
      this.fechaIngreso === ''
    ) {
      alert('Complete todos los campos');
      return;
    }

    let nuevoId = 1;

    for (const estudiante of this.estudiantes) {
      if (estudiante.id >= nuevoId) {
        nuevoId = estudiante.id + 1;
      }
    }

    const nuevoEstudiante: Estudiante = {
      id: nuevoId,
      cuenta: this.cuenta.trim(),
      nombre: this.nombre.trim(),
      carrera: this.carrera.trim(),
      fechaIngreso: this.fechaIngreso
    };

    this.estudiantes.push(nuevoEstudiante);

    this.guardarEnLocalStorage();
    this.limpiar();

    this.mensaje = 'Estudiante registrado correctamente';
  }

  limpiar() {
    this.cuenta = '';
    this.nombre = '';
    this.carrera = '';
    this.fechaIngreso = '';
  }

  guardarEnLocalStorage() {
    localStorage.setItem(
      'registrosEstudiantes',
      JSON.stringify(this.estudiantes)
    );
  }

  cerrarSesion() {
    localStorage.removeItem('sesionEstudiantes');
    this.router.navigate(['/login']);
  }
}
