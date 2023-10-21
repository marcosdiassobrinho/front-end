import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Genero } from 'src/app/models/genero.model';
import { GeneroService } from 'src/app/services/genero.service';

@Component({
  selector: 'app-genero-list',
  templateUrl: './genero-list.component.html',
  styleUrls: ['./genero-list.component.css']
})
export class GeneroListComponent implements OnInit {

  tableColumns: string[] = ['id-column', 'nome-column', 'acao-column'];
  generos: Genero[] = [];
  totalRegistros = 0;
  pageSize = 5;
  pagina = 0;
  filtro: string = "";


  constructor(private generoService: GeneroService) {}

  ngOnInit(): void {
    this.carregarGeneros();
    this.carregarTotalRegistros();
  }

  carregarGeneros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.generoService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.generos = data;
      });
    } else {
     // buscando todos os generos
      this.generoService.findAll(this.pagina, this.pageSize).subscribe(data => {
        this.generos = data;
      });
    }
  }

  carregarTotalRegistros() {
    //se existe dados no filtro
    if (this.filtro) {
      this.generoService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.generoService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  // Método para paginar os resultados
  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarGeneros();
  }

  aplicarFiltro() {
    this.carregarGeneros();
    this.carregarTotalRegistros();
  
  }

  excluir(genero: Genero) {

    if (genero.id != null) {

      this.generoService.delete(genero).subscribe({
        next: (generoCadastrado) => {
          this.ngOnInit();
        },
        error: (err) => {
          console.log('Erro ao excluir ' + JSON.stringify(err));
        }
      })
    }
  }

}
