import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlataformaRoutingModule } from './plataforma-routing.module';
import { PlataformaComponent } from './components/plataforma/plataforma.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    PlataformaComponent,
    ConfirmDialogComponent
  ],
    imports: [
        CommonModule,
        PlataformaRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatPaginatorModule
    ],
    providers: [MatDatepickerModule, MatNativeDateModule],

})
export class PlataformaModule { }
