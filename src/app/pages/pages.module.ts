import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { ChartsModule } from 'ng2-charts';

import { FormsModule } from '@angular/forms';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { Ng2GraficaComponent } from '../components/ng2-grafica/ng2-grafica.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        IncrementadorComponent,
        Ng2GraficaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})
export class PagesModule { }
