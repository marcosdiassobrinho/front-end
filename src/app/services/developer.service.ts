import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Developer } from '../models/developer.model';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(pagina: number, tamanhoPagina: number): Observable<Developer[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Developer[]>(`${this.baseURL}/developers`, {params});
  }

  findById(id: string): Observable<Developer> {
    return this.http.get<Developer>(`${this.baseURL}/developers/${id}`);
  }

  findByNome(nome: string, pagina: number, tamanhoPagina: number): Observable<Developer[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Developer[]>(`${this.baseURL}/developers/search/${nome}`, {params});
  }

  save(developer: Developer): Observable<Developer> {
    return this.http.post<Developer>(`${this.baseURL}/developers`, developer);
  }

  update(developer: Developer): Observable<Developer> {
    return this.http.put<Developer>(`${this.baseURL}/developers/${developer.id}`, developer );
  }

  delete(developer: Developer): Observable<any> {
    return this.http.delete<Developer>(`${this.baseURL}/developers/${developer.id}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/developers/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/developers/search/${nome}/count`);
  }
}
