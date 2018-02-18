import { Component, OnInit } from '@angular/core';
import { HospitalService, MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService) {

      this.activatedRoute.params.subscribe( params => {

        let id = params['id']; // en las rutas definimos la ruta medico/;id por eso aquí debemos hacer params['id']

        if (id !== 'nuevo') {
          this.cargarMedico( id );
        }
      });
     }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe( (resp: any) => this.hospitales = resp.hospitales);

    this._modalUploadService.notificacion.subscribe( (resp) => {
      this.medico.img = resp.medico.img;
    });
  }


  cambioHospital( id: string ) {

    this._hospitalService.obtenerHospital( id ).subscribe( hospital => {

      this.hospital = hospital;

    });

  }

  cargarMedico( id: string ) {
    this._medicoService.cargarMedico( id ).subscribe( medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital( this.medico.hospital );
    });
  }

  guardarMedico( f: NgForm ) {

    if (f.invalid) {
      return;
    }

    if (this.medico._id) {
      // actualizar médico
      this._medicoService.actualizarMedico( this.medico ).subscribe( medico => {
        console.log( medico );
      });
    } else {
      // crear médico
      this._medicoService.crearMedico( this.medico ).subscribe( medico => {

          this.medico = medico;

          this.router.navigate(['/medico', medico._id]);
        } );
    }

  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
