
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Libro {
  id: number;
  codigo: string;
  titulo: string;
  autor: string;
  anio: number;
}

@Component({
  selector: 'app-libro',
  imports: [FormsModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {

  libros: Libro[] = [];

  codigo = '';
  titulo = '';
  autor = '';
  anio: number | null = null;

  constructor(private router: Router) {
    if (localStorage.getItem('sesionBiblioteca') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }

    const datos = localStorage.getItem('librosBiblioteca');

    if (datos !== null) {
      this.libros = JSON.parse(datos);
    }
  }

  guardar() {
    if (
      this.codigo.trim() === '' ||
      this.titulo.trim() === '' ||
      this.autor.trim() === '' ||
      this.anio === null
    ) {
      alert('Complete todos los campos');
      return;
    }

    if (
      !Number.isInteger(this.anio) ||
      this.anio < 1000 ||
      this.anio > 9999
    ) {
      alert('El año debe ser un entero entre 1000 y 9999');
      return;
    }

    let nuevoId = 1;

    for (const libro of this.libros) {
      if (libro.id >= nuevoId) {
        nuevoId = libro.id + 1;
      }
    }

    const nuevoLibro: Libro = {
      id: nuevoId,
      codigo: this.codigo.trim(),
      titulo: this.titulo.trim(),
      autor: this.autor.trim(),
      anio: this.anio
    };

    this.libros.push(nuevoLibro);
    this.guardarEnLocalStorage();
    this.limpiar();
  }

  limpiar() {
    this.codigo = '';
    this.titulo = '';
    this.autor = '';
    this.anio = null;
  }

  guardarEnLocalStorage() {
    localStorage.setItem(
      'librosBiblioteca',
      JSON.stringify(this.libros)
    );
  }

  cerrarSesion() {
    localStorage.removeItem('sesionBiblioteca');
    this.router.navigate(['/login']);
  }
}

