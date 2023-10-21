import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperFormComponent } from './components/developer-form/developer-form.component';
import { DeveloperListComponent } from './components/developer-list/developer-list.component';
import { developerResolver } from './resolver/developer-resolver';

const routes: Routes = [
  {path: 'list', component: DeveloperListComponent},
  {path: 'new', component: DeveloperFormComponent},
  {path: 'edit/:id', component: DeveloperFormComponent, resolve: {developer: developerResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperRoutingModule { }
