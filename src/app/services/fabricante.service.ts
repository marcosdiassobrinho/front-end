import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fabricante} from "../models/fabricante.model";

@Injectable({
  providedIn: 'root'
})
export class FabricanteService {
  private baseURL: string =  'http://localhost:8080';
  constructor(private http: HttpClient) { }

  findAll(): Observable<Fabricante[]> {
    return this.http.get<Fabricante[]>(`${this.baseURL}/fabricantes`);
  }

  create(fabricante: Fabricante): Observable<Fabricante> {
    return this.http.post<Fabricante>(`${this.baseURL}/fabricantes`, fabricante);
  }

  update(fabricante: Fabricante): Observable<Fabricante> {
    const url = `${this.baseURL}/fabricantes/${fabricante.id}`;
    return this.http.put<Fabricante>(url, fabricante);
  }

  delete(fabricanteId: number): Observable<void> {
    const url = `${this.baseURL}/fabricantes/${fabricanteId}`;
    return this.http.delete<void>(url);
  }

}
