
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  estado: string;
}

@Component({
  selector: 'app-tarea',
  imports: [FormsModule],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css'
})
export class TareaComponent {

  tareas: Tarea[] = [];

  titulo = '';
  descripcion = '';
  fechaLimite = '';
  estado = 'Pendiente';

  mensaje = '';

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

      this.guardarEnLocalStorage();
    }
  }

  guardar() {
    if (
      this.titulo.trim() === '' ||
      this.descripcion.trim() === '' ||
      this.fechaLimite === '' ||
      !['Pendiente', 'Completada'].includes(this.estado)
    ) {
      alert('Complete correctamente todos los campos.');
      return;
    }

    let nuevoId = 1;

    for (const tarea of this.tareas) {
      if (tarea.id >= nuevoId) {
        nuevoId = tarea.id + 1;
      }
    }

    const nuevaTarea: Tarea = {
      id: nuevoId,
      titulo: this.titulo.trim(),
      descripcion: this.descripcion.trim(),
      fechaLimite: this.fechaLimite,
      estado: this.estado
    };

    this.tareas.push(nuevaTarea);

    this.guardarEnLocalStorage();
    this.limpiar();

    this.mensaje = 'Tarea registrada correctamente';
  }

  limpiar() {
    this.titulo = '';
    this.descripcion = '';
    this.fechaLimite = '';
    this.estado = 'Pendiente';
  }

  guardarEnLocalStorage() {
    localStorage.setItem(
      'agendaTareas',
      JSON.stringify(this.tareas)
    );
  }

  cerrarSesion() {
    localStorage.removeItem('sesionTareas');
    this.router.navigate(['/login']);
  }
}
