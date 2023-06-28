import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebTestService } from '../../services/web-test.service';
import { MessageService } from 'primeng/api';
import { catchError, forkJoin, of } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-new-pelicula',
  templateUrl: './new-pelicula.component.html',
  styleUrls: ['./new-pelicula.component.scss']
})
export class NewPeliculaComponent implements OnInit {

  @Input() inputEntityData: any = null;
  @Output() responseEntityData = new EventEmitter<string>();

  public displayMaximizable:any = false;
  public registerForm: any = {};
  public errorRegisterForm:any = {};
  public submmit: boolean = false;
  public delayFormRegister = {
    delay: 'pi-check',
    disable: false
  };
  public listPaises:any = [
    {
      label: 'Perú',
      value: 'Peru'
    },
    {
      label: 'Estados Unidados',
      value: 'EEUU'
    },
    {
      label: 'Colombia',
      value: 'COLOMBIA'
    },
    {
      label: 'Japón',
      value: 'JAPON'
    }
  ]
  public title: string = '';
  public titleButton: string = '';
  public dataMovieUpdate:any = null;

  constructor(private _webservice: WebTestService, private messageService: MessageService) { }

  ngOnInit() {
    
  }

  /** Codigo de inicializaciones de form y datos */
  ngOnChanges(changes:any) {
    this._callFunctionsData(changes)
  }
  _callFunctionsData(change:any) {
    this.initRegisterForm();
    this.initErrorForm();
    if( change.inputEntityData.currentValue ) {      
      this.displayMDNewMovie(true);
      this.getInitDataUpdate(change.inputEntityData.currentValue?.data);
    }
  }

  displayMDNewMovie(state: any) {
    this.displayMaximizable = state;
  }

  initRegisterForm() {
    this.registerForm = {
      id: null,
      titulo: null,
      direccion: null,
      produccion: null,
      fotografo: null,
      vestuario: null,
      resena: null,
      fechaEstreno: null,
      pais: null,
      duracion: null,
    }
  }

  initErrorForm() {
    this.errorRegisterForm = {
      titulo: { error: false, required: false, disable: false },
      direccion: { error: false, required: false, disable: false },
      produccion: { error: false, required: false, disable: false },
      fotografo: { error: false, required: false, disable: false },
      vestuario: { error: false, required: false, disable: false },
      resena: { error: false, required: false, disable: false },
      fechaEstreno: { error: false, required: false, disable: false },
      pais: { error: false, required: false, disable: false },
      duracion: { error: false, required: false, disable: false },
    }
  }

  getInitDataUpdate(data: any) {
    this.registerForm.pais = this.listPaises[0];
    this.registerForm.duracion = 0;
    this.dataMovieUpdate = null;
    this.title = 'Nueva';
    this.titleButton = 'Guardar';
    if( data ) {
      this.dataMovieUpdate = data;
      this.title = 'Actualizar'; 
      this.titleButton = 'Actualizar'; 
      this.registerForm.id = data.id;
      this.registerForm.titulo = data.titulo;
      this.registerForm.direccion = data.direccion;
      this.registerForm.produccion = data.produccion;
      this.registerForm.fotografo = data.fotografo;
      this.registerForm.vestuario = data.vestuario;
      this.registerForm.resena = data.resena;
      this.registerForm.fechaEstreno = new Date(data.fechaEstreno);

      if( data.pais ) {
        this.listPaises.forEach((element:any) => {
          if( element.value == data.pais ) {
            this.registerForm.pais = element;
          }          
        });
      }

      this.registerForm.duracion = data.duracion;
    }
  }

  validateFormRegister(){

    this.initErrorForm();  
    
    let error = false;
    if( this.submmit ) {
      if ( !this.registerForm.titulo ) {
        this.errorRegisterForm.titulo.error = true;
        this.errorRegisterForm.titulo.required = true;
        error = true;
      }
      if ( !this.registerForm.direccion ) {
        this.errorRegisterForm.direccion.error = true;
        this.errorRegisterForm.direccion.required = true;
        error = true;
      }
      if ( !this.registerForm.produccion ) {
        this.errorRegisterForm.produccion.error = true;
        this.errorRegisterForm.produccion.required = true;
        error = true;
      }
      if ( !this.registerForm.fotografo ) {
        this.errorRegisterForm.fotografo.error = true;
        this.errorRegisterForm.fotografo.required = true;
        error = true;
      }
      if ( !this.registerForm.vestuario ) {
        this.errorRegisterForm.vestuario.error = true;
        this.errorRegisterForm.vestuario.required = true;
        error = true;
      }
      if ( !this.registerForm.resena ) {
        this.errorRegisterForm.resena.error = true;
        this.errorRegisterForm.resena.required = true;
        error = true;
      }
      if ( !this.registerForm.fechaEstreno ) {
        this.errorRegisterForm.fechaEstreno.error = true;
        this.errorRegisterForm.fechaEstreno.required = true;
        error = true;
      }
      if ( !this.registerForm.pais ) {
        this.errorRegisterForm.pais.error = true;
        this.errorRegisterForm.pais.required = true;
        error = true;
      }
      if ( !this.registerForm.duracion ) {
        this.errorRegisterForm.duracion.error = true;
        this.errorRegisterForm.duracion.required = true;
        error = true;
      }

      if( error ) {
        return true;
      }
      return false;
    }
    return false;
  }

  saveForm() {
    this.delayFormRegister.delay = 'pi-spin pi-spinner';
    this.delayFormRegister.disable = true;
    this.submmit = true;

    if( this.validateFormRegister() ){
      this.delayFormRegister.delay = 'pi-check';
      this.delayFormRegister.disable = false;
      this.messageService.add({ key: 'error_bottom', severity: 'error', summary: 'Alerta', detail: 'Revise bien, hay formularios por validar.', life: 5000 });
      return;
    } 

    let formModel = JSON.parse(JSON.stringify(this.registerForm));
    formModel.pais = formModel.pais.value;
    formModel.fechaEstreno = moment(formModel.fechaEstreno).format('YYYY-MM-DD');

    let uri = null;
    let message:any = '';

    if( formModel.id ) {
      uri = this._webservice.putPeliculas(formModel).pipe(catchError(error => of(error)))
      message = 'Actualizado con éxito';
    } else {
      delete formModel.id;
      uri = this._webservice.postPeliculas(formModel).pipe(catchError(error => of(error)))
      message = 'Guardado con éxito';
    }

    forkJoin([
      uri
    ]).subscribe(
      (response:any) => {
                
        this.delayFormRegister.delay = 'pi-check';
        this.delayFormRegister.disable = false;

        if( response[0].ok == false ) {          
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Hubo un error interno, comunicate con tu administrador.'});
          return;
        }
        
        let resp: any = {
          data: response[0],
        };    
    
        this.responseEntityData.emit(resp);        
        this.messageService.add({severity: 'success', summary: 'Películas',detail: message,life: 5000, });
        this.displayMDNewMovie(false);
    });    
  }
}
