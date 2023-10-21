import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CidadeRoutingModule} from './cidade-routing.module';
import {CidadeComponent} from './components/cidade/cidade.component';

import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ConfirmDialogComponent} from "./components/confirm-dialog/confirm-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
    declarations: [
        CidadeComponent,
        ConfirmDialogComponent
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
        ReactiveFormsModule,
        MatPaginatorModule,
        MatDialogModule,
        MatSnackBarModule,
    ]
})
export class CidadeModule {
}
