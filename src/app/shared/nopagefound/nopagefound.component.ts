import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';

declare function init_plugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['../../../assets/css/pages/error-pages.css']
})
export class NopagefoundComponent implements OnInit {

  anio = new Date().getFullYear();

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
  }

}
