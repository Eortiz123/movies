import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WebTestService } from '../../services/web-test.service';
import { catchError, forkJoin, of } from 'rxjs';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import * as moment from 'moment';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-list-peliculas',
  templateUrl: './list-peliculas.component.html',
  styleUrls: ['./list-peliculas.component.scss']
})
export class ListPeliculasComponent implements OnInit {

  public listMovies:any = [];
  public listMenus:any = [];
  public loadedTableMovies:any = null;
  public identityTableListMovies:any = null;
  public selectedNodeListMovie:any = null;
  public entityDataUpdateNode:any = null;
  public entityDataRemoveNode:any = null;
  public contextItemsMenuListMovie:any = [
    {
      label: 'Modificar',
      icon: 'pi pi-fw pi-pencil',
      command: () => this.newMovie(this.selectedNodeListMovie)
    },
    {
      label: 'Remover',
      icon: 'pi pi-fw pi-times',
      command: () => this.removeMovie(this.selectedNodeListMovie)
    }
  ]

  constructor(private _webservice: WebTestService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.confirmHello();
    this.listMenus = [
      {
        label:'Nuevo',
        icon:'pi pi-fw pi-cog',
        items:[
          {
            label:'Película',
            icon:'pi pi-fw pi-plus',
            command: () => {
              this.newMovie(null);
            }
          }
        ]
      },    
      {
        label:'Actualizar',
        icon:'pi pi-fw pi-refresh',
        command: () => {
          this.getListMovies(this.identityTableListMovies);
        }
      },
    ]
  }

  getListMovies(event:any) {
    setTimeout(() => {
      this.identityTableListMovies = event;
      this.loadedTableMovies = true
  
      let uri = [
        this._webservice.getPeliculas('').pipe(catchError(error => of(error))),
      ];
  
      forkJoin([
        ...uri
      ]).subscribe(
        (response:any) => {
                  
          this.loadedTableMovies = false
  
          if( response[0].ok == false ) {          
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Hubo un error interno, comunicate con tu administrador.'});
            return;
          }
               
          this.listMovies = [...response[0]];
      });      
    }, 5);
  }

  newMovie(node:any) {
    let data:any = {
      data: node
    }
    this.entityDataUpdateNode = data;
  }
  removeMovie(node:any) {
    let data:any = {
      data: node
    }
    this.entityDataRemoveNode = data;
  }

  mdResponsesMovie(node:any) {
    this.getListMovies(this.identityTableListMovies);
  }

  getFormatedFechaEstreno(date:any) {
    if( date ) {
      return moment(date).format('DD/MM/YYYY')
    }
    return '';
  }

  clear(table: Table) {
    table.clear();
  }

  getNameFilters(event:any) {
    return event.target.value;
  }

  confirmHello() {
    this.confirmationService.confirm({
        message: 'Hola, bienvenido a mi trabajo - Universidad Continental, soy aspirante a practicante',
        header: 'BIENVENIDOS',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: "Ingresar y Aceptar",
        rejectLabel: "Salir y continuar",
        accept: () => {
          this.messageService.add({severity:'info', summary:'Confirmed', detail:'Gracias!'});
        },
        reject: (type:any) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
              break;
          }
      }
    });
  }
}
