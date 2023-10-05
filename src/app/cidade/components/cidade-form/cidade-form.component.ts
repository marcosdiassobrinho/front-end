import {Component, OnInit} from '@angular/core';
import {Estado} from 'src/app/models/estado.model';
import {EstadoService} from 'src/app/services/estado.service';
import {CidadeService} from "../../../services/cidade.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cidade} from "../../../models/cidade.model";

@Component({
    selector: 'app-cidade-form',
    templateUrl: './cidade-form.component.html',
    styleUrls: ['./cidade-form.component.css']
})
export class CidadeFormComponent implements OnInit {
    formGroup: FormGroup;
    estados: Estado[] = [];

    constructor(private estadoService: EstadoService,
                private cidadeService: CidadeService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                formBuilder: FormBuilder) {

        const cidade: Cidade = this.activatedRoute.snapshot.data['cidade'];

        this.formGroup = formBuilder.group({
            id: [(cidade && cidade.id) ? cidade.id : null],
            nome: [(cidade && cidade.nome) ? cidade.nome : '', Validators.required],
            estado: [(cidade && cidade.estado) ? cidade.estado : null, Validators.required],
        })

    }

    compareEstados(e1: Estado, e2: Estado): boolean {
        return e1 && e2 ? e1.id === e2.id : e1 === e2;
    }

    ngOnInit(): void {
        this.estadoService.findAll().subscribe(data => {
            this.estados = data;
        });
    }

    salvar() {
        if (this.formGroup.valid) {
            const cidade = this.formGroup.value;
            if (cidade.id == null) {
                this.cidadeService.save(cidade).subscribe({
                    next: (cidadeCadastrada) => {
                        this.router.navigateByUrl('/cidades/list');
                    },
                    error: (err) => {
                        console.log('Erro ao incluir' + JSON.stringify(err));
                    }
                });
            } else {
                this.cidadeService.update(cidade).subscribe({
                    next: (cidadeCadastrada) => {
                        this.router.navigateByUrl('/cidades/list');
                    },
                    error: (err) => {
                        console.log('Erro ao alterar' + JSON.stringify(err));
                    }
                });
            }
        }
    }


    excluir() {
        const cidade = this.formGroup.value;
        if (cidade.id != null) {
            this.cidadeService.delete(cidade).subscribe({
                next: (e) => {
                    this.router.navigateByUrl('/cidades/list');
                },
                error: (err) => {
                    console.log('Erro ao excluir' + JSON.stringify(err));
                }
            });
        }
    }

}
