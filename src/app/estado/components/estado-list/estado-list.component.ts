import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Estado } from 'src/app/models/estado.model';
import { EstadoService } from 'src/app/services/estado.service';


@Component({
  selector: 'app-estado-list',
  templateUrl: './estado-list.component.html',
  styleUrls: ['./estado-list.component.css']
})
export class EstadoListComponent implements OnInit {

  tableColumns: string[] = ['id-column', 'nome-column', 'sigla-column', 'acao-column'];
  estados: Estado[] = [];
  totalRegistros = 0;
  pageSize = 5;
  pagina = 0;
  filtro: string = "";

  constructor(private estadoService: EstadoService) { }

  ngOnInit(): void {
    this.carregarEstados();
    this.carregarTotalRegistros();
  }

  carregarEstados() {
    // se existe dados no filtro
    if (this.filtro) {
      this.estadoService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.estados = data;
      });
    } else {
      // buscando todos os estados
      this.estadoService.findAll(this.pagina, this.pageSize).subscribe(data => {
        this.estados = data;
      });
    }
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.estadoService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.estadoService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  // Método para paginar os resultados
  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarEstados();
  }

  aplicarFiltro() {
    this.carregarEstados();
    this.carregarTotalRegistros();
  
  }

  excluir(estado: Estado) {

    if (estado.id != null) {

      this.estadoService.delete(estado).subscribe({
        next: (estadoCadastrado) => {
          this.ngOnInit();
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      })
    }
  }

}