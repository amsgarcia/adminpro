import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {


  constructor(public _usuarioService: UsuarioService, public _router: Router) {}

  canActivate(): boolean {

    console.log('Pasó por el loginGuard');

    if (this._usuarioService.estaLogueado()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
