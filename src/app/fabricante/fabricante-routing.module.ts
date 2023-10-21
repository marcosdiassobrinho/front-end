import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FabricanteComponent} from "./components/fabricante/fabricante.component";

const routes: Routes = [
  {path: '', component: FabricanteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricanteRoutingModule { }
