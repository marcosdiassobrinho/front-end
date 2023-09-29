import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CidadeRoutingModule } from './cidade-routing.module';
import { CidadeFormComponent } from './components/cidade-form/cidade-form.component';
import { CidadeListComponent } from './components/cidade-list/cidade-list.component';

import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CidadeFormComponent,
    CidadeListComponent
  ],
  imports: [
    CommonModule,
    CidadeRoutingModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class CidadeModule { }
