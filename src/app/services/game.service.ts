import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(pagina: number, tamanhoPagina: number): Observable<Game[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Game[]>(`${this.baseURL}/games`, {params});
  }

  findById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.baseURL}/games/${id}`);
  }

  findByNome(nome: string, pagina: number, tamanhoPagina: number): Observable<Game[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Game[]>(`${this.baseURL}/games/search/${nome}`, {params});
  }

  save(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this.baseURL}/games`, game);
  }

  update(game: Game): Observable<Game> {
    return this.http.put<Game>(`${this.baseURL}/games/${game.id}`, game );
  }

  delete(game: Game): Observable<any> {
    return this.http.delete<Game>(`${this.baseURL}/games/${game.id}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/games/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/games/search/${nome}/count`);
  }
}
