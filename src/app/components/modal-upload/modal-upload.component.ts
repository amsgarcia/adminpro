import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


  public imagenASubir: File = null;
  public tmpImg: string = null;

  constructor(
      public _subirArchivoService: SubirArchivoService,
      public _modalUploadService: ModalUploadService
  ) {
    this.cerrarModal();
  }

  ngOnInit() {
    this._modalUploadService.ocultarModal();
  }

  cerrarModal() {
    this.imagenASubir = null;
    this.tmpImg = null;

    this._modalUploadService.ocultarModal();
  }

  subirImagen() {

      this._subirArchivoService.subirArchivo(this.imagenASubir, this._modalUploadService.tipo, this._modalUploadService.id)
          .then( (resp ) => {
            this.cerrarModal();
            this._modalUploadService.notificacion.emit( resp );
          })
          .catch ( ( err ) => {
            console.error('Error al subir archivo');
          });
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

}
