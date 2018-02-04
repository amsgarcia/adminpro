import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string = '', tipo: string = 'usuarios'): any {

    let url = URL_SERVICIOS + '/img';

    if (!img ) {
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch ( tipo ) {

      case 'usuarios':

         url += '/usuarios/' + img;

      break;

      case 'medicos':

        url += '/medicos/' + img;

      break;

      case 'hospitales':

        url += '/hospitales/' + img;

      break;

      default:  // como si fuera un usuario

        console.log('El tipo de imagen debe ser usuarios, medicos o hospitales');
        url += '/usuarios/xxx';

      break;
    }


    return url;

  }

}
