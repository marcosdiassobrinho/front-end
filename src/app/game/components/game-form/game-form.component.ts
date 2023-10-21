import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/models/game.model';
import { Developer } from 'src/app/models/developer.model';
import { Genero } from 'src/app/models/genero.model';
import { DeveloperService } from 'src/app/services/developer.service';
import { GeneroService } from 'src/app/services/genero.service';
import { Plataforma } from 'src/app/models/plataforma.model';
import { PlataformaService } from 'src/app/services/plataforma.service.ts';
import { Fabricante } from 'src/app/models/fabricante.model';


@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
  formGroup: FormGroup;
  games: Game[] = [];
  developers: Developer[] = [];

  generos: Genero[] = [];
  generoControl = new FormControl('');

  plataformas: Plataforma[] = [];
  plataformasControl = new FormControl('');

  constructor(private formBuilder: FormBuilder,
    private gameService: GameService,
    private generoService: GeneroService,
    private plataformaService: PlataformaService,
    private developer: DeveloperService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const game: Game = this.activatedRoute.snapshot.data['game'];
    this.formGroup = formBuilder.group({
      id: [(game && game.id) ? game.id : null],
      nome: [(game && game.nome) ? game.nome : '', Validators.required],
      descricao: [(game && game.descricao) ? game.descricao : '', Validators.required],
      preco: [(game && game.preco) ? game.preco : '', Validators.required],
      estoque: [(game && game.estoque) ? game.estoque: '', Validators.required],
      diretor: [(game && game.diretor) ? game.diretor : '', Validators.required],
      anoLancamento: [(game && game.anoLancamento) ? game.anoLancamento : '', Validators.required],
      developer: [(game && game.developer) ? game.developer : null, Validators.required],
      generos: [(game && game.generos) ? game.generos: null, Validators.required],
      plataformas: [(game && game.plataformas) ? game.plataformas: null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.developer.findAll(0, 30).subscribe(data => {
      this.developers = data;
    });
    this.generoService.findAll(0, 30).subscribe(data => {
      this.generos = data;
    });
    this.plataformaService.findAll().subscribe(data => {
      this.plataformas = data;
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const novoGame = this.formGroup.value;
      if (novoGame.id == null) {
        console.log('Enviando solicitação POST para criar um novo game:', novoGame);

        this.gameService.save(novoGame).subscribe({
          next: (gameCadastrado) => {
            console.log('Resposta da solicitação POST:', gameCadastrado);
            this.router.navigateByUrl('/games/list');
          },
          error: (err) => {
            console.log('Erro ao criar game:', err);
          }
        });
      } else {
        console.log('Enviando solicitação PUT para atualizar o game:', novoGame);

        this.gameService.update(novoGame).subscribe({
          next: (gameCadastrado) => {
            console.log('Resposta da solicitação PUT:', gameCadastrado);
            this.router.navigateByUrl('/games/list');
          },
          error: (err) => {
            console.log('Erro ao atualizar game:', err);
          }
        });
      }
    }
  }

  excluir() {
    const novoGame = this.formGroup.value;
    if (novoGame.id == null) {
      console.log('Não é possível excluir um game que ainda não foi criado.');
      return;
    }

    console.log('Enviando solicitação DELETE para excluir o game:', novoGame);

    this.gameService.delete(novoGame).subscribe({
      next: () => {
        console.log('Game excluído com sucesso.');
        this.router.navigateByUrl('/games/list');
      },
      error: (err) => {
        console.log('Erro ao excluir game:', err);
      }
    });
  }

  compareDevelopers(f1: Developer, f2: Developer): boolean {
    return f1 && f2 ? f1.id === f2.id : f1 === f2;
  }

  compareGenero(f1: Genero, f2: Genero): boolean {
    return f1 && f2 ? f1.id === f2.id : f1 === f2;
  }

  comparePlataforma(f1: Plataforma, f2: Plataforma): boolean {
    return f1 && f2 ? f1.id === f2.id : f1 === f2;
  }


}
