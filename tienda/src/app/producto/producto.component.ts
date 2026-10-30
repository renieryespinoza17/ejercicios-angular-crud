
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  existencias: number;
}

@Component({
  selector: 'app-producto',
  imports: [FormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  productos: Producto[] = [];

  codigo = '';
  nombre = '';
  precio: number | null = null;
  existencias: number | null = null;

  indiceEditar = -1;
  mensaje = '';

  constructor(private router: Router) {
    if (localStorage.getItem('sesionTienda') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }

    const datos = localStorage.getItem('productosTienda');

    if (datos !== null) {
      this.productos = JSON.parse(datos);
    }
  }

  editar(indice: number) {
    this.indiceEditar = indice;
    this.codigo = this.productos[indice].codigo;
    this.nombre = this.productos[indice].nombre;
    this.precio = this.productos[indice].precio;
    this.existencias = this.productos[indice].existencias;
    this.mensaje = '';
  }

  guardar() {
    if (
      this.codigo.trim() === '' ||
      this.nombre.trim() === '' ||
      this.precio === null ||
      this.existencias === null
    ) {
      alert('Complete todos los campos');
      return;
    }

    if (!Number.isFinite(this.precio) || this.precio <= 0) {
      alert('El precio debe ser mayor que cero');
      return;
    }

    if (
      !Number.isInteger(this.existencias) ||
      this.existencias < 0
    ) {
      alert('Las existencias deben ser un entero mayor o igual a cero');
      return;
    }

    if (this.indiceEditar === -1) {
      let nuevoId = 1;

      for (const producto of this.productos) {
        if (producto.id >= nuevoId) {
          nuevoId = producto.id + 1;
        }
      }

      const nuevoProducto: Producto = {
        id: nuevoId,
        codigo: this.codigo.trim(),
        nombre: this.nombre.trim(),
        precio: this.precio,
        existencias: this.existencias
      };

      this.productos.push(nuevoProducto);
      this.mensaje = 'Producto registrado correctamente';

    } else {
      this.productos[this.indiceEditar].codigo = this.codigo.trim();
      this.productos[this.indiceEditar].nombre = this.nombre.trim();
      this.productos[this.indiceEditar].precio = this.precio;
      this.productos[this.indiceEditar].existencias = this.existencias;

      this.mensaje = 'Producto actualizado correctamente';
    }

    this.guardarEnLocalStorage();
    this.limpiar(false);
  }

  limpiar(borrarMensaje = true) {
    this.codigo = '';
    this.nombre = '';
    this.precio = null;
    this.existencias = null;
    this.indiceEditar = -1;

    if (borrarMensaje) {
      this.mensaje = '';
    }
  }

  guardarEnLocalStorage() {
    localStorage.setItem(
      'productosTienda',
      JSON.stringify(this.productos)
    );
  }
    
eliminar(indice: number) {
  const confirmar = confirm(
    '¿Está seguro de eliminar este producto?'
  );

  if (!confirmar) {
    return;
  }

  this.productos.splice(indice, 1);
  this.guardarEnLocalStorage();
  this.limpiar();

  this.mensaje = 'Producto eliminado correctamente';
}


  cerrarSesion() {
    localStorage.removeItem('sesionTienda');
    this.router.navigate(['/login']);
  }
}
