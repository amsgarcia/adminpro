import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// import * as swal from 'sweetalert';
import swal from 'sweet-alert';

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { VALID } from '@angular/forms/src/model';

declare function init_plugins();



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public _router: Router
  ) { }

  sonIguales( campo1: string, campo2: string ) {
    return ((group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return { sonIguales: true};
    });
  }

  noSeleccionado() {
    return ((group: FormGroup) => {

      let seleccionado = group.controls['conditions'].value;

      if (seleccionado) {
        return null;
      }

      return { noSeleccionado: true};
    });
  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      name: new FormControl( null, Validators.required),
      email: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      conditions: new FormControl( false, this.noSeleccionado )
    }, {validators: [this.sonIguales('password', 'password2')] });

  }

  public registrarUsuario() {

    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.conditions) {
      swal('Importante!', 'Debe aceptar las condiciones', 'warning');

      return;
    }

    let usuario = new Usuario(
      this.forma.value.name,
      this.forma.value.email,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario( usuario ).subscribe( (respuesta: any) => {

      console.log( respuesta );
      // aquí dentro no hay error nunca ya que en el servidor  la respuesta  lleva código de error 404, 500 etc.
      // y no entraría aquí nunca

       // swal('Usuario creado correctamente', respuesta.usuario.email, 'success');

       swal({
         title: 'Usuario creado correctamente',
         text: respuesta.usuario.email,
         icon: 'success'
       });

      this._router.navigate(['/login']);
    });

  }

}
