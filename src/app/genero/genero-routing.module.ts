import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneroListComponent } from './components/genero-list/genero-list.component';
import { GeneroFormComponent } from './components/genero-form/genero-form.component';
import { generoResolver } from './resolver/genero-resolver';

const routes: Routes = [
  {path: 'list', component: GeneroListComponent},
  {path: 'new', component: GeneroFormComponent},
  {path: 'edit/:id', component: GeneroFormComponent, resolve: {genero: generoResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneroRoutingModule { }
