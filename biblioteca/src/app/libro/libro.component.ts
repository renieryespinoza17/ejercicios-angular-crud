
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

  indiceEditar = -1;
  mensaje = '';

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

  editar(indice: number) {
    this.indiceEditar = indice;
    this.codigo = this.libros[indice].codigo;
    this.titulo = this.libros[indice].titulo;
    this.autor = this.libros[indice].autor;
    this.anio = this.libros[indice].anio;
    this.mensaje = '';
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

    if (this.indiceEditar === -1) {
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
      this.mensaje = 'Libro registrado correctamente';

    } else {
      this.libros[this.indiceEditar].codigo = this.codigo.trim();
      this.libros[this.indiceEditar].titulo = this.titulo.trim();
      this.libros[this.indiceEditar].autor = this.autor.trim();
      this.libros[this.indiceEditar].anio = this.anio;

      this.mensaje = 'Libro actualizado correctamente';
    }

    this.guardarEnLocalStorage();
    this.limpiar(false);
  }

  limpiar(borrarMensaje = true) {
    this.codigo = '';
    this.titulo = '';
    this.autor = '';
    this.anio = null;
    this.indiceEditar = -1;

    if (borrarMensaje) {
      this.mensaje = '';
    }
  }

  guardarEnLocalStorage() {
    localStorage.setItem(
      'librosBiblioteca',
      JSON.stringify(this.libros)
    );
  }

eliminar(indice: number) {
  const confirmar = confirm(
    '¿Está seguro de eliminar este libro?'
  );

  if (!confirmar) {
    return;
  }

  this.libros.splice(indice, 1);
  this.guardarEnLocalStorage();
  this.limpiar();
  this.mensaje = 'Libro eliminado correctamente';
}

  cerrarSesion() {
    localStorage.removeItem('sesionBiblioteca');
    this.router.navigate(['/login']);
  }
}
