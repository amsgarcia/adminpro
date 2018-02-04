import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Event } from '@angular/router/src/events';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public usuario: Usuario;

  public imagenASubir: File = null;
  public tmpImg: string = null;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.usuario;
   }

  ngOnInit() {
  }

  actualizarDatosUsuario(usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
                .subscribe();
  }

  seleccionImagen(archivo: File) {

      if (!archivo) {
        this.tmpImg = null;
        return;
      }


      if ( archivo.type.indexOf('image') < 0 ) {
        this.imagenASubir = null;
        this.tmpImg = null;

        swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');

        return;
      }

      let reader = new FileReader();
      let urlImgTmp = reader.readAsDataURL(archivo);

      this.imagenASubir = archivo;

      reader.onloadend = () => {
          this.tmpImg = reader.result;
      };

    }

    cambiarImagen() {

      if (!this.tmpImg) {
        this.imagenASubir = null;
        return;
      }

      this._usuarioService.cambiarImagen( this.imagenASubir, this.usuario._id);
  }

}
