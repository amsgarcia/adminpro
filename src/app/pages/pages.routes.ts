import { RouterModule, Routes } from '@angular/router';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard, VerificaTokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';



const pagesRoutes: Routes = [
//        {path: '', component: PagesComponent,
//             canActivate: [LoginGuardGuard],
//             children: [
                {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress Bar'}, canActivate: [VerificaTokenGuard]},
                {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas'}, canActivate: [VerificaTokenGuard]},
                {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}, canActivate: [VerificaTokenGuard]},
                {path: 'account-settings',
                    component: AccountSettingsComponent,
                    data: {titulo: 'Account Settings'},
                    canActivate: [VerificaTokenGuard]},
                {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}, canActivate: [VerificaTokenGuard]},
                {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}, canActivate: [VerificaTokenGuard]},
                {path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}, canActivate: [VerificaTokenGuard]},
                {path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'}, canActivate: [VerificaTokenGuard]},

                // Mantenimientos
                {path: 'usuarios',
                    component: UsuariosComponent,
                    data: {titulo: 'Mantenimiento de Usuarios'},
                    canActivate: [AdminGuard, VerificaTokenGuard]},

                {path: 'hospitales', 
                    component: HospitalesComponent,
                    data: {titulo: 'Mantenimiento de Hospitales'},
                    canActivate: [VerificaTokenGuard]},

                {path: 'medicos',
                    component: MedicosComponent,
                    data: {titulo: 'Mantenimiento de Médicos'},
                    canActivate: [VerificaTokenGuard]},

                {path: 'medico/:id',
                    component: MedicoComponent,
                    data: {titulo: 'Actualizar Médico'},
                    canActivate: [VerificaTokenGuard]},

                {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
 //            ]
 //       }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);


