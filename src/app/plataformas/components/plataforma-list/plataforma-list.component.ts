import {Component, OnInit} from '@angular/core';
import {Fabricante} from "../../../models/fabricante.model";
import {FabricanteService} from "../../../services/fabricante.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Plataforma} from "../../../models/plataforma.model";
import {PlataformaService} from "../../../services/plataforma.service";

@Component({
    selector: 'app-plataforma-list',
    templateUrl: './plataforma-list.component.html',
    styleUrls: ['./plataforma-list.component.css']
})
export class PlataformaListComponent implements OnInit {
    plataformas: Plataforma[] = [];
    fabricantes: Fabricante[] = [];
    form: FormGroup;
    activeSection: string | null = 'left';
    editingPlataforma: Plataforma | null = null;

    constructor(private fabricanteService: FabricanteService, private plataformaService: PlataformaService, private fb: FormBuilder, private dialog: MatDialog, private snackBar: MatSnackBar) {
        this.form = this.fb.group({
            nome: ['', Validators.required],
            descricao: ['', Validators.required],
            anoLancamento: [null, Validators.required],
            fabricante: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.buscarPlataformas();
        this.buscarFabricantes();
    }

    private buscarPlataformas() {
        this.plataformaService.findAll().subscribe(data => {
            this.plataformas = data.sort((a, b) => a.nome.localeCompare(b.nome));
        });

    }

    private buscarFabricantes() {
        this.fabricanteService.findAll().subscribe(data => {
            this.fabricantes = data.sort((a, b) => a.nome.localeCompare(b.nome));
        });
    }

    activateLeftSection(): void {
        this.activeSection = 'left';
        this.form.reset();
        this.editingPlataforma = null;
    }

    activateRightSection(): void {
        this.activeSection = 'right';

    }

    openConfirmDialog(): void {
        const message = this.editingPlataforma
            ? 'Você tem certeza que deseja salvar as alterações para ' + this.editingPlataforma.nome + '?'
            : 'Você tem certeza que deseja adicionar esta plataforma?';

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {message: message}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.saveFabricante();
                this.buscarPlataformas();
            }
        });
    }


    saveFabricante(): void {
        if (this.form.valid) {
            const plataformaData: Plataforma = this.form.value;
            if (this.editingPlataforma) {
                plataformaData.id = this.editingPlataforma.id;
                this.plataformaService.update(plataformaData).subscribe(data => {
                    this.editingPlataforma = null;
                    this.form.reset();
                    this.buscarPlataformas()
                });

            } else {
                this.plataformaService.create(plataformaData).subscribe(data => {
                    this.fabricantes.push(data);
                    this.form.reset();

                }, error => {
                    this.snackBar.open('Erro ao tentar salvar plataforma', 'Fechar', {
                        duration: 5000,
                        verticalPosition: 'top'
                    });
                });
            }
            this.activateLeftSection()
        }
    }


    onEdit(event: Event, plataformaId: number): void {
        event.stopPropagation();
        const plataforma = this.plataformas.find(f => f.id === plataformaId);
        if (plataforma) {
            this.editingPlataforma = plataforma;
            this.form.patchValue({
                nome: plataforma.nome,
                descricao: plataforma.descricao,
                anoLancamento: plataforma.anoLancamento,
                fabricante: plataforma.fabricante
            });
            this.activateRightSection()
        }
    }

    compareFabricantes(f1: Fabricante, f2: Fabricante): boolean {
        return f1 && f2 ? f1.id === f2.id : f1 === f2;
    }

    onDelete(plataformaId: number): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {message: 'Você tem certeza que deseja remover esta plataforma?'}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deletePlataforma(plataformaId);
                this.buscarPlataformas();
                this.buscarFabricantes();
            }
        });
    }

    deletePlataforma(plataformaId: number): void {
        this.plataformaService.delete(plataformaId).subscribe(
            () => {
                this.plataformas = this.plataformas.filter(p => p.id !== plataformaId);
            },
            (error) => {
                if (error.status === 409) {
                    this.snackBar.open('Não foi possível deletar a plataforma porque ela está em uso.', 'Fechar', {
                        duration: 5000,
                        verticalPosition: 'top'
                    });
                } else {
                    this.snackBar.open('Erro ao deletar a plataforma.', 'Fechar', {
                        duration: 5000,
                        verticalPosition: 'top'
                    });
                }
            }
        );
    }


}
