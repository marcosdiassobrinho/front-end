import { Component, OnInit, ViewChild } from '@angular/core';
import { Fabricante } from "../../../models/fabricante.model";
import { FabricanteService } from "../../../services/fabricante.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SearchService } from "../../../services/search.service";
import { MatPaginator } from "@angular/material/paginator";

@Component({
    selector: 'app-fabricante',
    templateUrl: './fabricante.component.html',
    styleUrls: ['./fabricante.component.css']
})
export class FabricanteComponent implements OnInit {
    fabricantes: Fabricante[] = [];
    form: FormGroup;
    activeSection: string | null = 'left';
    editingFabricante: Fabricante | null = null;
    totalFabricantes: number = 0;
    pageSize: number = 3;
    pageIndex: number = 0;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private fabricanteService: FabricanteService,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private searchService: SearchService
    ) {
        this.form = this.fb.group({
            nome: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.refreshData();
        this.searchService.getSearchTerm().subscribe(term => {
            this.pageIndex = 0;
            this.pageSize = 3;
            this.buscarFabricantes(term);
        });
        this. ngAfterViewInit()
    }

    ngAfterViewInit(): void {
        this.paginator.page.subscribe(() => {
            this.pageIndex = this.paginator.pageIndex;
            this.pageSize = this.paginator.pageSize;
            const lastSearchTerm = this.searchService.getLastSearchTerm();
            this.buscarFabricantes(lastSearchTerm);
        });
    }

    private refreshData(): void {
        this.buscarFabricantes();
    }

    private buscarFabricantes(term: string = ''): void {
        this.fabricanteService.searchFabricantes(term, this.pageIndex, this.pageSize).subscribe(data => {
            this.fabricantes = data;
            this.fabricanteService.countFabricantes().subscribe(total => {
                this.totalFabricantes = total;
            });
        });
    }

    activateLeftSection(): void {
        this.activeSection = 'left';
        this.form.reset();
        this.editingFabricante = null;
    }

    activateRightSection(): void {
        this.activeSection = 'right';
    }

    openConfirmDialog(): void {
        const message = this.editingFabricante
            ? 'Você tem certeza que deseja salvar as alterações para este fabricante?'
            : 'Você tem certeza que deseja adicionar este fabricante?';

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: { message: message }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.saveFabricante();
                this.buscarFabricantes();
            }
        });
    }


    saveFabricante(): void {
        if (this.form.valid) {
            const fabricanteData: Fabricante = this.form.value;

            if (this.editingFabricante) {
                fabricanteData.id = this.editingFabricante.id;

                this.fabricanteService.update(fabricanteData).subscribe(data => {
                    this.editingFabricante = null;
                    this.form.reset();
                    this.buscarFabricantes()
                });

            } else {
                this.fabricanteService.create(fabricanteData).subscribe(data => {
                    this.fabricantes.push(data);
                    this.form.reset();

                }, error => {
                    this.snackBar.open('Erro ao tentar salvar Fabricante', 'Fechar', {
                        duration: 5000,
                        verticalPosition: 'top'
                    });
                });
            }
            this.activateLeftSection()
        }
    }


    onEdit(event: Event, fabricanteId: number): void {
        event.stopPropagation();
        const fabricante = this.fabricantes.find(f => f.id === fabricanteId);
        if (fabricante) {
            this.editingFabricante = fabricante;
            this.form.setValue({
                nome: fabricante.nome
            });
            this.activateRightSection()
        }
    }


    onDelete(fabricanteId: number): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: { message: 'Você tem certeza que deseja remover este fabricante?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteFabricante(fabricanteId);
                this.buscarFabricantes();
            }
        });
    }
    deleteFabricante(fabricanteId: number): void {
        this.fabricanteService.delete(fabricanteId).subscribe(
            () => {
                this.fabricantes = this.fabricantes.filter(f => f.id !== fabricanteId);
            },
            (error) => {
                if (error.status === 409) {
                    this.snackBar.open('Não foi possível deletar o fabricante porque ele está em uso.', 'Fechar', {
                        duration: 5000,
                        verticalPosition: 'top'
                    });
                } else {
                    this.snackBar.open('Erro ao deletar o fabricante.', 'Fechar', {
                        duration: 5000,
                        verticalPosition: 'top'
                    });
                }
            }
        );
    }
    onDeleteForm() {
        this.deleteFabricante(this.editingFabricante!.id);
        this.activateLeftSection()
    }

    onClearForm() {
        this.activateLeftSection()
    }


}
