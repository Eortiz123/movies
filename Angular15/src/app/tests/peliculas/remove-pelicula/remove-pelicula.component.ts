import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebTestService } from '../../services/web-test.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-remove-pelicula',
  templateUrl: './remove-pelicula.component.html',
  styleUrls: ['./remove-pelicula.component.scss']
})
export class RemovePeliculaComponent  implements OnInit {

  @Input() inputEntityData: any = null;
  @Output() responseEntityData = new EventEmitter<string>();

  public displayRemoveMovie = false;
  public dataDestroy: any = null;
  public delayFormDestroy = 'pi-check';

  constructor(private _webservice: WebTestService, private messageService: MessageService) { }

  ngOnInit(): void {
    
  }

  displayMDDestroy(state: any) {
    this.displayRemoveMovie = state;
  }

  /** Codigo de inicializaciones de form y datos */
  ngOnChanges(changes:any) {
    this._callFunctionsData(changes)
  }
  _callFunctionsData(change:any) {
    if( change.inputEntityData.currentValue ) {
      this.displayMDDestroy(true);
      this.dataDestroy = change.inputEntityData.currentValue?.data;
    }
  }

  removeConfirmMovie() {

    this.delayFormDestroy = 'pi-spin pi-spinner';

    let uri = this._webservice.deletePeliculas(this.dataDestroy.id).pipe(catchError(error => of(error)));
    let message:any = 'Eliminado con éxito';

    forkJoin([
      uri
    ]).subscribe(
      (response:any) => {
                
        this.delayFormDestroy = 'pi-check';

        if( response[0].ok == false ) {          
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Hubo un error interno, comunicate con tu administrador.'});
          return;
        }
        
        let resp: any = {
          data: response[0],
        };    
    
        this.responseEntityData.emit(resp);        
        this.messageService.add({severity: 'success', summary: 'Películas',detail: message,life: 5000, });
        this.displayMDDestroy(false);
    }); 
  }

}