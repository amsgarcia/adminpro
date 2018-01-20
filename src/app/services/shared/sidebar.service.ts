import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Panel de Control', url: '/dashboard'},
        {titulo: 'Barra de Progreso', url: '/progress'},
        {titulo: 'Gráficas', url: '/graficas1'},

      ]
    }
  ];

  constructor() { }

}
