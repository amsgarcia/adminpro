import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Ng2Grafico } from '../../interfaces/ng2-grafico';

@Component({
  selector: 'app-ng2-grafica',
  templateUrl: './ng2-grafica.component.html',
  styles: []
})
export class Ng2GraficaComponent implements OnInit {

  @Input()  public grafica: Ng2Grafico;

 // public datos: Ng2Grafico;

  constructor() { }

  ngOnInit() {
    // this.datos  = this.grafica;
  }

}
