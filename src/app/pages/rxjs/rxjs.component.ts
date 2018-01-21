import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { setInterval } from 'timers';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.retornaObservable()
    .subscribe(
      data => console.log( 'Temporizador', data ), // primer callback - next()
      error => console.error('Error observable', error), // callback llamada cuando hay un error
      () => console.log( 'El observador terminó') // callback llamado al hacer complete() del observador
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {

    this.subscription.unsubscribe();

  }

  retornaObservable(): Observable<any> {
    return new Observable( observer => {

      // console.log('Iniciando observable');

      let contador = 0;

      // console.log('Contador tras incializarlo a CERO:', contador);

      let interval = setInterval( () => {

        // console.log('Dentro de Interval: Contador antes de incrementarlo', contador);

        contador += 1;

        let salida = { valor: contador };

        // console.log('Dentro de Interval: Contador después de incrementarlo', contador);

        observer.next( salida );

        // if (contador === 3) {
        //   clearInterval( interval );
        //   observer.complete();
        // }

        // if (contador === 2) {
        //  console.log('Contador = ', contador);
        //  clearInterval( interval );
        //  observer.error('El contador se ha igualado a 2!!!');

        // }


      }, 500 );

    }).retry(2)
    .map( (res: any) => {
    
      return res.valor;
    
    }).filter( (res, index) => {
        // console.log('FILTER', res);

        if (res % 2 === 1) {
          // impar
          return true;

        } else {
          // par
          return false;
        }
    });

}
