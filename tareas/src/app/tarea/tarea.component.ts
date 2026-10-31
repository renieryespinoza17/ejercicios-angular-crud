
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  estado: string;
}

@Component({
  selector: 'app-tarea',
  imports: [],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css'
})
export class TareaComponent {

  tareas: Tarea[] = [];

  constructor(private router: Router) {
    if (localStorage.getItem('sesionTareas') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }

    const datos = localStorage.getItem('agendaTareas');

    if (datos !== null) {
      this.tareas = JSON.parse(datos);
    } else {
      this.tareas = [
        {
          id: 1,
          titulo: 'Repasar Angular',
          descripcion: 'Practicar ngModel',
          fechaLimite: '2026-11-02',
          estado: 'Pendiente'
        },
        {
          id: 2,
          titulo: 'Leer apuntes',
          descripcion: 'Revisar componentes',
          fechaLimite: '2026-11-03',
          estado: 'Completada'
        }
      ];

      localStorage.setItem(
        'agendaTareas',
        JSON.stringify(this.tareas)
      );
    }
  }

  cerrarSesion() {
    localStorage.removeItem('sesionTareas');
    this.router.navigate(['/login']);
  }
}
