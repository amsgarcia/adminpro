import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public recuerdame: boolean = false;
  public email: string;

  auth2: any;


  constructor(
    public router: Router,
    public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();

    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 0) {
      this.recuerdame = true;
    }

  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '391463474301-tlmqo5qofcoh1b3dm7jlnsttnrfjrh2u.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn( document.getElementById('btnGoogle'));
    });
  }


  attachSignIn( element ) {
    this.auth2.attachClickHandler( element, {}, googleUser => {

      // let profile = googleUser.getBasicProfile();

      // console.log( profile );

      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle( token ).subscribe( resp => this.router.navigate(['/dashboard']) );
      // para refrescar, fallo de angular desede google---- window.location.href = '#/dashboard' );

    });
  }


  ingresar( forma: NgForm) {
   // this.router.navigate(['/dashboard']);

   let usuario = new Usuario( null, forma.value.email, forma.value.password );

   this._usuarioService.login( usuario, this.recuerdame )
       .subscribe( resp => this.router.navigate(['/dashboard']));

  }

}
