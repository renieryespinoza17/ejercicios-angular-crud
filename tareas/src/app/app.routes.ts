
import { inject } from '@angular/core';
import { Routes, CanActivateFn, Router } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TareaComponent } from './tarea/tarea.component';

const protegerTareas: CanActivateFn = () => {
  if (localStorage.getItem('sesionTareas') === 'si') {
    return true;
  }

  return inject(Router).createUrlTree(['/login']);
};

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'tareas',
    component: TareaComponent,
    canActivate: [protegerTareas]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
