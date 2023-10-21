import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Game } from 'src/app/models/game.model';
import { Genero } from 'src/app/models/genero.model';
import { Plataforma } from 'src/app/models/plataforma.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  tableColumns: string[] = ['id-column', 'nome-column', 'descri-column', 'preco-column', 'estoque-column', 'diretor-column', 'ano-column', 'dev-column', 'genero-column', 'plataformas-column', 'acao-column'];
  games: Game[] = [];
  totalRegistros = 0;
  pageSize = 4;
  pagina = 0;
  filtro: string = "";

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.carregarGames();
    this.carregarTotalRegistros();
  }

  carregarGames() {
    // se existe dados no filtro
    if (this.filtro) {
      this.gameService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.games = data;
      });
    } else {
      // buscando todos os games
      this.gameService.findAll(this.pagina, this.pageSize).subscribe(data => {
        this.games = data;
      });
    }
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.gameService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.gameService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  // Método para paginar os resultados
  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarGames();
  }

  aplicarFiltro() {
    this.carregarGames();
    this.carregarTotalRegistros();
  
  }

  excluir(game: Game) {

    if (game.id != null) {

      this.gameService.delete(game).subscribe({
        next: (gameCadastrado) => {
          this.ngOnInit();
        },
        error: (err) => {
          console.log('Erro ao excluir ' + JSON.stringify(err));
        }
      })
    }
  }

  getNomesPlataforma(game:Game): string {
    return game.plataformas.map(p => p.nome).join(', ');
  }

  getNomesGenero(game:Game): string {
    return game.generos.map(p => p.nome).join(', ');
  }

}
