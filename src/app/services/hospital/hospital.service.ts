import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class HospitalService {

  hospital: Hospital;



  constructor(
      public http: HttpClient,
      public router: Router,
      public _subirArchivoService: SubirArchivoService,
      public _usuarioService: UsuarioService) {
  }



  crearHospital(nombre: string) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    let hospital = new Hospital( nombre );

    return this.http.post( url, hospital).map( (resp: any) => {


      swal('Hospital ', hospital.nombre + ' creado', 'success');

      return true;

    });

  }


  actualizarHospital( hospital: Hospital) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital).map( (resp: any) => {


      swal('Hospital actualizado', hospital.nombre, 'success');

      return true;

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


  cargarHospitales(desde: number = 0) {

    let url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get(url);

  }

  obtenerHospital(id: string) {

    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url).map( (resp: any) => resp.hospital );

  }


  buscarHospitales( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url ).map( (resp: any) => resp.hospitales );
  }


  borrarHospital( id: String ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url ).map( (resp: any) => resp.hospital );
  }

}

