import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(private _settingsService: SettingsService) {
  }

  ngOnInit() {
    // aquí está cargada la página web con todos los elementos por tanto se llama inicializarCheck() aquí y no en el constructor

    this.inicializarCheck();
  }

  cambiaTema( tema: string, element: any ) {

    this.agregarCheck( element );
    this._settingsService.aplicarTema( tema );

  }

  agregarCheck( element: any ) {

    const elements: any = document.getElementsByClassName('selector');

    for (const e of elements) {
      e.classList.remove('working');
    }

    element.classList.add('working');
  }

  inicializarCheck() {

    const elements: any = document.getElementsByClassName('selector');

    for (const e of elements) {
      if (e.getAttribute('data-theme') === this._settingsService.ajustes.tema) {
        e.classList.add('working');
        break;
      }
    }
  }
}
