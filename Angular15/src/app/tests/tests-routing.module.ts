import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPeliculasComponent } from './peliculas/list-peliculas/list-peliculas.component';

const routes: Routes = [
  {
    path: '',
    component: ListPeliculasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule { }
