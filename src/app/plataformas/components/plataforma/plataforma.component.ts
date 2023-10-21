import {Component, OnInit, ViewChild} from '@angular/core';
import {Fabricante} from "../../../models/fabricante.model";
import {FabricanteService} from "../../../services/fabricante.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Plataforma} from "../../../models/plataforma.model";
import {PlataformaService} from "../../../services/plataforma.service";
import {catchError, EMPTY, Observable, switchMap, tap} from "rxjs";
import {SearchService} from "../../../services/search.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
    selector: 'app-plataforma',
    templateUrl: './plataforma.component.html',
    styleUrls: ['./plataforma.component.css']
})
export class PlataformaComponent implements OnInit {
    plataformas: Plataforma[] = [];
    fabricantes: Fabricante[] = [];
    form!: FormGroup;
    activeSection: string | null = 'left';
    editingPlataforma: Plataforma | null = null;
    selectedImage: File | null = null;
    selectedImageSrc: string | null = null;
    totalPlataformas: number = 0;
    pageSize: number = 2;
    pageIndex: number = 0;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private fabricanteService: FabricanteService,
        private plataformaService: PlataformaService,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private searchService: SearchService
    ) {
        this.initializeForm();
    }

    ngOnInit(): void {
        this.refreshData();
        this.searchService.getSearchTerm().subscribe(term => {
            this.pageIndex = 0;
            this.pageSize = 2;
            this.buscarPlataformas(term);
        });
        this.ngAfterViewInit();
    }

    ngAfterViewInit(): void {
        this.paginator.page.subscribe(() => {
            this.pageIndex = this.paginator.pageIndex;
            this.pageSize = this.paginator.pageSize;
            const lastSearchTerm = this.searchService.getLastSearchTerm();
            this.buscarPlataformas(lastSearchTerm);
        });
    }


    private initializeForm(): void {
        this.form = this.fb.group({
            nome: ['', Validators.required],
            descricao: ['', Validators.required],
            anoLancamento: [null, Validators.required],
            fabricante: [null, Validators.required]
        });
    }

    private refreshData(): void {
        this.buscarPlataformas();
        this.buscarFabricantes();
    }

    private buscarPlataformas(term: string = ''): void {
        this.plataformaService.searchPlataformas(term, this.pageIndex, this.pageSize).subscribe(data => {
            this.plataformas = data;
            this.plataformaService.countPlataformas().subscribe(total => {
                this.totalPlataformas = total;
            });
        });
    }

    private buscarFabricantes(): void {
        this.fabricanteService.findAll().subscribe(data => {
            this.fabricantes = data.sort((a, b) => a.nome.localeCompare(b.nome));
        });
    }

    activateLeftSection(): void {
        this.activeSection = 'left';
        this.form.reset();
        this.editingPlataforma = null;
        this.selectedImage = null;
        this.selectedImageSrc = null;
    }

    activateRightSection(): void {
        this.activeSection = 'right';
    }

    confirmAction(message: string, action: () => void): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {message}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                action();
            }
        });
    }

    saveFabricante(): void {
        if (!this.form.valid) return;

        const plataformaData: Plataforma = this.form.value;
        const actionObservable = this.determineSaveAction(plataformaData);
        const handleImageUpload = this.selectedImage ? this.handleImageUploadObservable(plataformaData) : actionObservable;

        handleImageUpload.subscribe({
            next: () => this.postSaveActions(),
            error: error => this.handleError(error)
        });
    }

    onDeleteForm() {
        this.confirmAction('Você tem certeza que deseja remover esta plataforma?', () => {
            this.deletePlataforma(this.editingPlataforma!.id);
            this.refreshData();
        });
    }

    onClearForm() {
        this.activateLeftSection()
    }


    private handleImageUploadObservable(plataformaData: Plataforma): Observable<any> {
        if (this.selectedImage) {
            return this.plataformaService.uploadImage(this.selectedImage).pipe(
                tap(imagePath => plataformaData.imagePath = imagePath),
                switchMap(() => this.determineSaveAction(plataformaData)),
                catchError(error => {
                    this.showMessage('Erro ao fazer upload da imagem. Tente novamente.');
                    return EMPTY;
                })
            );
        } else {
            return EMPTY;
        }
    }


    private determineSaveAction(plataforma: Plataforma): Observable<any> {
        if (this.editingPlataforma) {
            plataforma.id = this.editingPlataforma.id;
            return this.plataformaService.update(plataforma);
        }
        return this.plataformaService.create(plataforma);
    }

    postSaveActions(): void {
        this.buscarPlataformas();
        this.activateLeftSection();
    }

    handleError(error: any): void {
        console.error('An error occurred', error);
        this.showMessage('Erro ao tentar salvar plataforma');
    }

    onEdit(event: Event, plataformaId: number): void {
        event.stopPropagation();
        this.activateRightSection();
        this.populateFormForEdit(plataformaId);
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


    private populateFormForEdit(plataformaId: number): void {
        const plataforma = this.plataformas.find(f => f.id === plataformaId);
        if (!plataforma) return;

        this.editingPlataforma = plataforma;
        this.form.patchValue({
            nome: plataforma.nome,
            descricao: plataforma.descricao,
            anoLancamento: plataforma.anoLancamento,
            fabricante: plataforma.fabricante
        });
        this.selectedImageSrc = this.getImagePath(plataforma.imagePath);
    }

    getImagePath(imageName: string): string {
        return `http://localhost:8080/imagens/${imageName}`;
    }


    compareFabricantes(f1: Fabricante, f2: Fabricante): boolean {
        return f1 && f2 ? f1.id === f2.id : f1 === f2;
    }

    onDelete(plataformaId: number): void {
        this.confirmAction('Você tem certeza que deseja remover esta plataforma?', () => {
            this.deletePlataforma(plataformaId);
            this.refreshData();
        });
    }

    private deletePlataforma(plataformaId: number): void {
        this.plataformaService.delete(plataformaId).subscribe({
            next: () => {
                this.plataformas = this.plataformas.filter(p => p.id !== plataformaId);
            },
            error: error => this.handleDeleteError(error)
        });
    }

    private handleDeleteError(error: any): void {
        const message = error.status === 409
            ? 'Não foi possível deletar a plataforma porque ela está em uso.'
            : 'Erro ao deletar a plataforma.';
        this.showMessage(message);
    }

    private showMessage(message: string): void {
        this.snackBar.open(message, 'Fechar', {
            duration: 5000,
            verticalPosition: 'top'
        });
    }

    onImageSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.selectedImage = input.files?.length ? input.files[0] : null;

        if (this.selectedImage) {
            const reader = new FileReader();
            reader.onload = e => this.selectedImageSrc = e.target?.result as string;
            reader.readAsDataURL(this.selectedImage);
        } else {
            this.selectedImageSrc = null;
        }
    }

    triggerImageUpload(): void {
        const inputElement = document.getElementById('imageInput') as HTMLInputElement;
        inputElement.click();
    }
}