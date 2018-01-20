import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtPorcentaje') txtPorcentaje: ElementRef;

  @Input() porcentaje: number = 50;
  @Input('nombre') leyenda = 'Leyenda';

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { } // aquí los valores de los input no están inicializados, están sólo los valores por defecto

  ngOnInit() {  // aquí es donde se reciben los valores de los input !!!!
  }

  cambiarValor(delta: number) {
    if (this.porcentaje + delta > 100 || this.porcentaje + delta < 0) {
      return;
    }

    this.porcentaje += delta;
    this.cambioValor.emit(this.porcentaje);

    this.txtPorcentaje.nativeElement.focus();

  }

  onChanges(newValue) {

   // const htmlElement: any = document.getElementsByName('porcentaje')[0];

    if (newValue < 0 ) {
      this.porcentaje = 0;
    } else if (newValue > 100) {
      this.porcentaje = 100;
    } else {
      this.porcentaje = newValue;
    }

    this.txtPorcentaje.nativeElement.value = this.porcentaje;

    this.cambioValor.emit(this.porcentaje);


  }

}
