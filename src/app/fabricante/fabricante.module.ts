import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FabricanteRoutingModule } from './fabricante-routing.module';
import { FabricanteListComponent } from './components/fabricante-list/fabricante-list.component';
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


@NgModule({
  declarations: [
    FabricanteListComponent,
    ConfirmDialogComponent
  ],
    imports: [
        CommonModule,
        FabricanteRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule
    ]
})
export class FabricanteModule { }
