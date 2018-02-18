import { Injectable } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class MedicoService {

  medico: Medico;



  constructor(
      public http: HttpClient,
      public router: Router,
      public _subirArchivoService: SubirArchivoService,
      public _usuarioService: UsuarioService) {
  }



  crearMedico(medico: Medico) {

    let url = URL_SERVICIOS + '/medico';
    url += '?token=' + this._usuarioService.token;

    // medico.usuario = this._usuarioService.usuario._id;

    return this.http.post( url, medico).map( (resp: any) => {


      swal('Médico creado',  resp.medico.nombre, 'success');

      return resp.medico;

    });

  }


  actualizarMedico( medico: Medico) {

    let url = URL_SERVICIOS + '/medico/' + medico._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, medico).map( (resp: any) => {


      swal('Medico actualizado', resp.medico.nombre, 'success');

      return resp.medico;

    });


  }


  /*
  cambiarImagen( archivo: File, id: string ) {
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)
            .then( (resp: any) => {

              this.usuario.img = resp.usuario.img;
              swal('Imagen actualizada', this.usuario.nombre, 'success');

              this.guardarStorage( id, this.token, resp.usuario );


            })
            .catch( resp => {
              console.error( resp );
            });
  }
  */


  cargarMedicos(desde: number = 0) {

    let url = URL_SERVICIOS + '/medico?desde=' + desde;

    return this.http.get(url);

  }

  
  cargarMedico(id: string) {

    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url).map( (resp: any) => resp.medico );

  }



  buscarMedicos( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url ).map( (resp: any) => resp.medicos );
  }


  borrarMedico( id: String ) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url ).map( (resp: any) => resp.medico );
  }

}

