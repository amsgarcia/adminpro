import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: Settings = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  AJUSTES_LS = 'ajustesAdminApp';

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem(this.AJUSTES_LS, JSON.stringify(this.ajustes));
  }


  cargarAjustes() {
    if (localStorage.getItem(this.AJUSTES_LS)) {
      this.ajustes = JSON.parse(localStorage.getItem(this.AJUSTES_LS));

      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema( tema: string ) {
    const url = `assets/css/colors/${tema}.css`;

    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }
}



interface Settings {
  temaUrl: string;
  tema: string;
}
