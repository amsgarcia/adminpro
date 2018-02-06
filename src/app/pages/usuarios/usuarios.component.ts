import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService, ModalUploadService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  cargando: boolean = false;

  totalRegistros: number = 0;

  constructor(
        public _usuarioService: UsuarioService,
        public _modalUploadService: ModalUploadService  ) {}

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion.subscribe( resp => this.cargarUsuarios() );

  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde ).subscribe( (resp: any) => {

        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;

        this.cargando = false;

    });
  }

  abrirModal( usuario: Usuario ) {

    this._modalUploadService.mostrarModal('usuarios', usuario._id);

  }

  siguientePagina() {

    if (this.desde + 5 > (this.totalRegistros - 1) ) {
      return;
    }

    this.desde += 5;

    this.cargarUsuarios();

  }

  paginaAnterior() {
    this.desde -= 5;
    if (this.desde < 0) {
      this.desde = 0;
    }

    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ) {
    if (!termino || termino === '') {

      this.desde = 0;
      this.cargarUsuarios();

    } else {

      this.cargando = true;

      this._usuarioService.buscarUsuarios( termino ).subscribe( (usuarios: Usuario[]) => {
        this.usuarios = usuarios;

        this.cargando = false;
      });

    }
  }

  borrarUsuario( usuario: Usuario ) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('Importante', 'No puedes borrarte a ti mismo', 'error');
      return;
    }

    swal({
      title: '¿Estás seguro?',
      text: 'Estás a punto de borrar el usuario ' + usuario.nombre + ' (' + usuario.email + ')',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

        this._usuarioService.borrarUsuario( usuario ).subscribe();
        this.cargarUsuarios();

        swal('Usuario ' + usuario.nombre + ' borrado', {
          icon: 'success'
        });
      }
    });
  }

  guardarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario( usuario ).subscribe();
  }


}
