import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService, ModalUploadService } from '../../services/service.index';


declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  cargando: boolean = false;


  totalRegistros: number = 0;

  constructor(
        public _medicoService: MedicoService,
        public _modalUploadService: ModalUploadService  ) {}

  ngOnInit() {
    this.cargarMedicos();

    this._modalUploadService.notificacion.subscribe( resp => this.cargarMedicos() );

  }

  cargarMedicos() {

    this.cargando = true;

    this._medicoService.cargarMedicos( this.desde ).subscribe( (resp: any) => {

        this.totalRegistros = resp.total;
        this.medicos = resp.medicos;

        this.cargando = false;

    });
  }




  abrirModal( medico: Medico ) {

    this._modalUploadService.mostrarModal('medicos', medico._id);

  }

  siguientePagina() {

    if (this.desde + 5 > (this.totalRegistros - 1) ) {
      return;
    }

    this.desde += 5;

    this.cargarMedicos();

  }

  paginaAnterior() {
    this.desde -= 5;
    if (this.desde < 0) {
      this.desde = 0;
    }

    this.cargarMedicos();

  }


  buscarMedico( termino: string ) {
    if (!termino || termino === '') {

      this.desde = 0;
      this.cargarMedicos();

    } else {

      this.cargando = true;

      this._medicoService.buscarMedicos( termino ).subscribe( (medicos: Medico[]) => {
        this.medicos = medicos;

        this.cargando = false;
      });

    }
  }

  borrarMedico( medico: Medico) {
    swal({
      title: '¿Estás seguro?',
      text: 'Estás a punto de borrar el médicoo ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

        this._medicoService.borrarMedico( medico._id ).subscribe( () => {
          swal('Médico ' + medico.nombre + ' borrado', {
            icon: 'success'
          });
          this.cargarMedicos();

        });
      }
    });
  }

}
