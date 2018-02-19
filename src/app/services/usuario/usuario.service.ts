import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/throw';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.token.length > 0 ? true : false);
  }

  renovarToken() {

    let url = URL_SERVICIOS + '/login/newtoken';
    url += '?token=' + this.token;

    return this.http.get( url )
               .map( (resp: any) => {
                  this.token = resp.token;
                  localStorage.setItem('token', this.token);
                  return true;
               })
               .catch( err => {

                  swal('No se puedo renovar token', 'Intente hacer login de nuevo', 'error');

                  this.logout();

                  return Observable.throw( err );
               });
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.usuario = null;
      this.token = '';
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.token = '';
    this.usuario = null;
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, {token: token})
                .map( (resp: any) => {
                    this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                    return true;
                })
                .catch( err => {

                  swal('Error en el login', err.error.mensaje, 'error');

                  return Observable.throw( err );
               });
  }

  login( usuario: Usuario, recordar = false) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';

    return this.http.post( url, usuario)
               .map( (resp: any) => {
                   this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                   return true;
               })
               .catch( err => {

                  swal('Error en el login', err.error.mensaje, 'error');

                  return Observable.throw( err );
               });
  }

  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario)
                    .catch( err => {

                      swal(err.error.mensaje, err.error.errors.message, 'error');

                      return Observable.throw( err );
                   });
  }

  actualizarUsuario( usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).map( (resp: any) => {

      if (usuario._id === this.usuario._id) {
        this.guardarStorage(resp.usuario._id, this.token, resp.usuario, resp.menu);
      }

      swal('Usuario actualizado', usuario.nombre, 'success');

      return true;

    });


  }

  cambiarImagen( archivo: File, id: string ) {
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)
            .then( (resp: any) => {

              this.usuario.img = resp.usuario.img;
              swal('Imagen actualizada', this.usuario.nombre, 'success');

              this.guardarStorage( id, this.token, resp.usuario, this.menu );


            })
            .catch( resp => {
              console.error( resp );
            });
  }


  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url ).map( (resp: any) => resp.usuarios );
  }

  borrarUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.delete( url ).map( (resp: any) => resp.usuario );
  }

}
