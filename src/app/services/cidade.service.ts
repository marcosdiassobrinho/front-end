import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cidade} from '../models/cidade.model';


@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.baseURL}/cidades`);
  }

  findById(id: string): Observable<Cidade> {
    return this.http.get<Cidade>(`${this.baseURL}/cidades/${id}`);
  }

  save(cidade: Cidade): Observable<Cidade> {
    return this.http.post<Cidade>(`${this.baseURL}/cidades`, cidade);
  }

  update(cidade: Cidade): Observable<Cidade> {
    return this.http.put<Cidade>(`${this.baseURL}/cidades/${cidade.id}`, cidade );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<Cidade>(`${this.baseURL}/cidades/${id}`);
  }

  searchCidades(searchTerm: string, pageIndex: number, pageSize: number): Observable<Cidade[]> {
    let params = new HttpParams()
        .set('nome', searchTerm)
        .set('page', pageIndex.toString())
        .set('size', pageSize.toString());

    return this.http.get<Cidade[]>(`${this.baseURL}/cidades/search`, {params});
  }

  countCidades(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/cidades/count`);
  }

}
