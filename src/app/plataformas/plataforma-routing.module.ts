import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlataformaListComponent} from "./components/plataforma-list/plataforma-list.component";

const routes: Routes = [
  {path: 'list', component: PlataformaListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlataformaRoutingModule { }
