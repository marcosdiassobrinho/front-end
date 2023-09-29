import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FabricanteListComponent} from "./components/fabricante-list/fabricante-list.component";

const routes: Routes = [
  {path: 'list', component: FabricanteListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricanteRoutingModule { }
