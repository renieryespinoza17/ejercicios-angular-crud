
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Estudiante {
  id: number;
  cuenta: string;
  nombre: string;
  carrera: string;
  fechaIngreso: string;
}

@Component({
  selector: 'app-estudiante',
  imports: [],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent {

  estudiantes: Estudiante[] = [];

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

  cerrarSesion() {
    localStorage.removeItem('sesionEstudiantes');
    this.router.navigate(['/login']);
  }
}
