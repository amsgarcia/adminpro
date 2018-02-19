import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService ) {}

  canActivate(): Promise<boolean> | boolean {

    let token = this._usuarioService.token;

    let payload = JSON.parse( atob(token.split('.')[1]) );

    let expirado = this.expirado( payload.exp );

    if (expirado) {
      this._usuarioService.logout();
      return false;
    }

    return this.verificaRenueva( payload.exp );
  }

  verificaRenueva( fechaExp: number ): Promise<boolean> {

    return new Promise( (resolve, reject) => {

      let ahora = new Date().getTime() / 1000; // en segundos

      if ( fechaExp - ahora < 3600 ) { // menos de una hora
        resolve( true );
      } else {

        this._usuarioService.renovarToken().subscribe( () => {
          resolve( true );
        }, () => {
          this._usuarioService.logout();
          reject( false );
        });
      }

    });

  }

  expirado( fechaExp: number ) {

    let ahora = new Date().getTime() / 1000; // en segundos

    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }

  }
}
