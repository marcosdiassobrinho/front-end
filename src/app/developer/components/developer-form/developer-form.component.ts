import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeveloperService } from 'src/app/services/developer.service';
import { Developer } from 'src/app/models/developer.model';

@Component({
  selector: 'app-developer-form',
  templateUrl: './developer-form.component.html',
  styleUrls: ['./developer-form.component.css']
})
export class DeveloperFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private developerService: DeveloperService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    const developer: Developer = this.activatedRoute.snapshot.data['developer'];
    this.formGroup = formBuilder.group({
      id:[(developer && developer.id)? developer.id : null],
      nome:[(developer && developer.nome)? developer.nome : '', Validators.required],
      fundacao:[(developer && developer.fundacao)? developer.fundacao : '', Validators.required]
    })
  }

  salvar() {
    if (this.formGroup.valid) {
      const novoDeveloper = this.formGroup.value;
      if (novoDeveloper.id == null) {

        this.developerService.save(novoDeveloper).subscribe({
          next: (developerCadastrado) => {
            this.router.navigateByUrl('/developers/list');
          },
          error: (err) => {
            console.log('Erro ao salvar' + JSON.stringify(err));
          }
        })
      }
      else {

        this.developerService.update(novoDeveloper).subscribe({
          next: (developerCadastrado) => {
            this.router.navigateByUrl('/developers/list');
          },
          error: (err) => {
            console.log('Erro ao salvar' + JSON.stringify(err));
          }
        })
      }
    }
  }

  excluir() {
    const novoDeveloper = this.formGroup.value;
    if (novoDeveloper.id == null) {
      console.log('Não é possível excluir um developer que ainda não foi criado.');
      return;
    }

    console.log('Enviando solicitação DELETE para excluir o developer:', novoDeveloper);

    this.developerService.delete(novoDeveloper).subscribe({
      next: () => {
        console.log('Developer excluído com sucesso.');
        this.router.navigateByUrl('/developers/list');
      },
      error: (err) => {
        console.log('Erro ao excluir developer:', err);
      }
    });
  }
}
