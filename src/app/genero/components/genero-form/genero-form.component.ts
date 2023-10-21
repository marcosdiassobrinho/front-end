import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneroService } from 'src/app/services/genero.service';
import { Genero } from 'src/app/models/genero.model';

@Component({
  selector: 'app-genero-form',
  templateUrl: './genero-form.component.html',
  styleUrls: ['./genero-form.component.css']
})
export class GeneroFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private generoService: GeneroService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    const genero: Genero = this.activatedRoute.snapshot.data['genero'];
    this.formGroup = formBuilder.group({
      id:[(genero && genero.id)? genero.id : null],
      nome:[(genero && genero.nome)? genero.nome : '', Validators.required]
    })
  }

  salvar() {
    if (this.formGroup.valid) {
      const novoGenero = this.formGroup.value;
      if (novoGenero.id == null) {

        this.generoService.save(novoGenero).subscribe({
          next: (generoCadastrado) => {
            this.router.navigateByUrl('/generos/list');
          },
          error: (err) => {
            console.log('Erro ao salvar' + JSON.stringify(err));
          }
        })
      }
      else {

        this.generoService.update(novoGenero).subscribe({
          next: (generoCadastrado) => {
            this.router.navigateByUrl('/generos/list');
          },
          error: (err) => {
            console.log('Erro ao salvar' + JSON.stringify(err));
          }
        })
      }
    }
  }

  excluir() {
    const novoGenero = this.formGroup.value;
    if (novoGenero.id == null) {
      console.log('Não é possível excluir um genero que ainda não foi criado.');
      return;
    }

    console.log('Enviando solicitação DELETE para excluir o genero:', novoGenero);

    this.generoService.delete(novoGenero).subscribe({
      next: () => {
        console.log('Genero excluído com sucesso.');
        this.router.navigateByUrl('/generos/list');
      },
      error: (err) => {
        console.log('Erro ao excluir genero:', err);
      }
    });
  }
}
