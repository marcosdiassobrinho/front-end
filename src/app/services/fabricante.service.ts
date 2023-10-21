import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fabricante} from "../models/fabricante.model";
import {Plataforma} from "../models/plataforma.model";

@Injectable({
    providedIn: 'root'
})
export class FabricanteService {
    private baseURL: string = 'http://localhost:8080';

    constructor(private http: HttpClient) {
    }

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

    searchFabricantes(searchTerm: string, pageIndex: number, pageSize: number): Observable<Fabricante[]> {
        let params = new HttpParams()
            .set('nome', searchTerm)
            .set('page', pageIndex.toString())
            .set('size', pageSize.toString());

        return this.http.get<Fabricante[]>(`${this.baseURL}/fabricantes/search`, {params});
    }

    countFabricantes(): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/fabricantes/count`);
    }

}
