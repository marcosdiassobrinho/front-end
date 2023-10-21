import {Component, OnInit, ViewChild} from '@angular/core';
import {Cidade} from "../../../models/cidade.model";
import {CidadeService} from "../../../services/cidade.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SearchService} from "../../../services/search.service";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {Estado} from "../../../models/estado.model";
import {EstadoService} from "../../../services/estado.service";

@Component({
    selector: 'app-cidade',
    templateUrl: './cidade.component.html',
    styleUrls: ['./cidade.component.css']
})
export class CidadeComponent implements OnInit {

    cidades: Cidade[] = [];
    estados: Estado[] = [];
    form: FormGroup;
    activeSection: string | null = 'left';
    editingCidade: Cidade | null = null;
    totalCidades: number = 0;
    pageSize: number = 3;
    pageIndex: number = 0;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private cidadeService: CidadeService,
        private estadoService: EstadoService,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private searchService: SearchService
    ) {
        this.form = this.fb.group({
            nome: ['', Validators.required],
            estado: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.refreshData();
        this.searchService.getSearchTerm().subscribe(term => {
            this.pageIndex = 0;
            this.pageSize = 3;
            this.buscarCidades(term);
        });
        this.ngAfterViewInit()
    }

    ngAfterViewInit(): void {
        this.paginator.page.subscribe(() => {
            this.pageIndex = this.paginator.pageIndex;
            this.pageSize = this.paginator.pageSize;
            const lastSearchTerm = this.searchService.getLastSearchTerm();
            this.buscarCidades(lastSearchTerm);
        });
    }

    private refreshData(): void {
        this.buscarCidades();
        this.buscarEstados();
    }

    compareEstados(f1: Estado, f2: Estado): boolean {
        return f1 && f2 ? f1.id === f2.id : f1 === f2;
    }

    private buscarEstados(): void {
        this.estadoService.findAll().subscribe(data => {
            this.estados = data.sort((a, b) => a.nome.localeCompare(b.nome));
        });
    }

    private buscarCidades(term: string = ''): void {
        this.cidadeService.searchCidades(term, this.pageIndex, this.pageSize).subscribe(data => {
            this.cidades = data;
            this.cidadeService.countCidades().subscribe(total => {
                this.totalCidades = total;
            });
        });
    }

    activateLeftSection(): void {
        this.activeSection = 'left';
        this.form.reset();
        this.editingCidade = null;
    }

    activateRightSection(): void {
        this.activeSection = 'right';
    }

    openConfirmDialog(): void {
        const message = this.editingCidade
            ? 'Você tem certeza que deseja salvar as alterações para esta cidade?'
            : 'Você tem certeza que deseja adicionar esta cidade?';

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {message: message}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.saveCidade();
                this.buscarCidades();
            }
        });
    }

    saveCidade(): void {
        if (this.form.valid) {
            const cidadeData: Cidade = this.form.value;
            if (this.editingCidade) {
                cidadeData.id = this.editingCidade.id;

                this.cidadeService.update(cidadeData).subscribe(data => {
                    this.editingCidade = null;
                    this.form.reset();
                    this.buscarCidades()
                });

            } else {
                this.cidadeService.save(cidadeData).subscribe(data => {
                    this.cidades.push(data);
                    this.form.reset();

                }, error => {
                    this.snackBar.open('Erro ao tentar salvar cidade', 'Fechar', {
                        duration: 5000,
                        verticalPosition: 'top'
                    });
                });
            }
            this.activateLeftSection()
        }
    }


    onEdit(event: Event, cidadeId: number): void {
        event.stopPropagation();
        const cidade = this.cidades.find(f => f.id === cidadeId);
        if (cidade) {
            this.editingCidade = cidade;
            this.form.setValue({
                nome: cidade.nome,
                estado: cidade.estado
            });
            this.activateRightSection()
        }
    }


    onDelete(cidadeId: number): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {message: 'Você tem certeza que deseja remover esta cidade?'}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteCidade(cidadeId);
                this.buscarCidades();
            }
        });
    }

    deleteCidade(cidadeId: number): void {
        this.cidadeService.delete(cidadeId).subscribe(
            () => {
                this.cidades = this.cidades.filter(f => f.id !== cidadeId);
            },
            (error) => {
                if (error.status === 409) {
                    this.snackBar.open('Não foi possível deletar a cidade porque ele está em uso.', 'Fechar', {
                        duration: 5000,
                        verticalPosition: 'top'
                    });
                } else {
                    this.snackBar.open('Erro ao deletar a cidade.', 'Fechar', {
                        duration: 5000,
                        verticalPosition: 'top'
                    });
                }
            }
        );
    }

    onDeleteForm() {
        this.onDelete(this.editingCidade!.id);
        this.activateLeftSection()
    }

    onClearForm() {
        this.activateLeftSection()
    }
}
