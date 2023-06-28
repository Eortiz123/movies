import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestsRoutingModule } from './tests-routing.module';
import { WebTestService } from './services/web-test.service';
import { ListPeliculasComponent } from './peliculas/list-peliculas/list-peliculas.component';
import { RemovePeliculaComponent } from './peliculas/remove-pelicula/remove-pelicula.component';
import { NewPeliculaComponent } from './peliculas/new-pelicula/new-pelicula.component';
import { MessageConfirmsPeliculaComponent } from './peliculas/message-confirms-pelicula/message-confirms-pelicula.component';

import {TableModule} from 'primeng/table';
import {MegaMenuModule} from 'primeng/megamenu';
import { HttpClientModule } from '@angular/common/http';
import {DividerModule} from 'primeng/divider';
import {MenubarModule} from 'primeng/menubar';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {MenuModule} from 'primeng/menu';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@NgModule({
  declarations: [
    ListPeliculasComponent,
    RemovePeliculaComponent,
    NewPeliculaComponent,
    MessageConfirmsPeliculaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TestsRoutingModule,
    TableModule,
    MegaMenuModule,
    DividerModule,
    MenubarModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    MenuModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    InputTextareaModule,
    ConfirmDialogModule
  ],
  exports: [
    ListPeliculasComponent,
    RemovePeliculaComponent,
    NewPeliculaComponent,
    MessageConfirmsPeliculaComponent
  ],
  providers: [
    WebTestService,
    MessageService,
    ConfirmationService
  ]
})
export class TestsModule { }
