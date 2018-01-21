import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd} from '@angular/router';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  public titulo = '';

  constructor(
    private _router: Router,
    private _title: Title,
    private _meta: Meta
  ) {

    this.getRouteData().subscribe( data => {

        this.titulo = data.titulo;
        this._title.setTitle(this.titulo);

        let metaTag: MetaDefinition = {
          name: 'description',
          content: this.titulo
        };

        _meta.updateTag( metaTag );

    });
  }

  getRouteData() {

    return this._router.events
    .filter( evento => evento instanceof ActivationEnd)
    .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null)
    .map( (evento: ActivationEnd) => evento.snapshot.data);

  }

  ngOnInit() {
  }

}
