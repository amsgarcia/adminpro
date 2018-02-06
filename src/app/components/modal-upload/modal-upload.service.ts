import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>(); // emitiré el objeto respuesta del servicio de carga de imágenes.

  constructor() {

   }

   ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
   }

   mostrarModal(tipo: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
   }


}
