import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService, ModalUploadService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  cargando: boolean = false;

  totalRegistros: number = 0;

  constructor(
        public _hospitalService: HospitalService,
        public _modalUploadService: ModalUploadService  ) {}

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe( resp => this.cargarHospitales() );

  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales( this.desde ).subscribe( (resp: any) => {

        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;

        this.cargando = false;

    });
  }

  crearHospital() {

    swal({
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Nombre del nuevo hospital',
          type: 'text',
        },
      },
    }).then( ( nombre ) => {

      if (nombre && nombre.length > 0) {

        this._hospitalService.crearHospital( nombre ).subscribe( () => this.cargarHospitales());
      }

    });
  }

  abrirModal( hospital: Hospital ) {

    this._modalUploadService.mostrarModal('hospitales', hospital._id);

  }

  siguientePagina() {

    if (this.desde + 5 > (this.totalRegistros - 1) ) {
      return;
    }

    this.desde += 5;

    this.cargarHospitales();

  }

  paginaAnterior() {
    this.desde -= 5;
    if (this.desde < 0) {
      this.desde = 0;
    }

    this.cargarHospitales();

  }

  buscarHospital( termino: string ) {
    if (!termino || termino === '') {

      this.desde = 0;
      this.cargarHospitales();

    } else {

      this.cargando = true;

      this._hospitalService.buscarHospitales( termino ).subscribe( (hospitales: Hospital[]) => {
        this.hospitales = hospitales;

        this.cargando = false;
      });

    }
  }

  borrarHospital( hospital: Hospital ) {

    swal({
      title: '¿Estás seguro?',
      text: 'Estás a punto de borrar el hospital ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

        this._hospitalService.borrarHospital( hospital._id ).subscribe( () => {
          swal('Hospital ' + hospital.nombre + ' borrado', {
            icon: 'success'
          });
          this.cargarHospitales();

        });
      }
    });
  }

  guardarHospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital( hospital ).subscribe();
  }


}
