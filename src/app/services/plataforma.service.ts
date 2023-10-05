import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Plataforma} from "../models/plataforma.model";

@Injectable({
    providedIn: 'root'
})
export class PlataformaService {
    private baseURL: string = 'http://localhost:8080/plataformas';

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Plataforma[]> {
        return this.http.get<Plataforma[]>(`${this.baseURL}`);
    }

    create(plataforma: Plataforma): Observable<Plataforma> {
        return this.http.post<Plataforma>(`${this.baseURL}/`, plataforma);
    }

    update(plataforma: Plataforma): Observable<Plataforma> {
        const url = `${this.baseURL}/${plataforma.id}`;
        return this.http.put<Plataforma>(url, plataforma);
    }

    delete(id: number): Observable<void> {
        const url = `${this.baseURL}/${id}`;
        return this.http.delete<void>(url);
    }

    uploadImage(file: File): Observable<string> {
        const formData = new FormData();
        formData.append('imagem', file, file.name);
        formData.append('nomeImagem', file.name);

        return this.http.post<any>("http://localhost:8080/imagens", formData).pipe(
            map(response => response.nomeImagem)
        );
    }



}
