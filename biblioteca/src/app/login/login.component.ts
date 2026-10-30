
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = '';
  clave = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    if (
      this.usuario === 'bibliotecario' &&
      this.clave === 'biblio123'
    ) {
      localStorage.setItem('sesionBiblioteca', 'si');
      this.router.navigate(['/libros']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
