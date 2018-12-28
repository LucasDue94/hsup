import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";

@Injectable()
export class UsuarioService {

    private baseUrl = 'http://localhost:8080/';

    constructor(private http: HttpClient) {
    }

    list(max?: any, fieldSearch?: any, searchTerm?: string, offset?: number): Observable<Usuario[]> {
        let subject = new Subject<Usuario[]>();
        this.http.get(this.baseUrl + `usuario?offset=${offset}&max=${max}`, {params: {fieldSearch: searchTerm}})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['usuario'].map((item: any) => new Usuario(item)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Usuario[]>(this.baseUrl + 'usuario/')
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<Usuario> {
        let usuario;
        return this.http.get(this.baseUrl + 'usuario/' + id)
            .map((r: Response) => {
                usuario = new Usuario(r);
                return usuario
            });
    }

    save(usuario: Usuario): Observable<Usuario> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };

        let url;

        if (usuario.id) {
            url = this.baseUrl + 'usuario/' + usuario.id;
            return this.http.put<Usuario>(url, usuario, {headers: httpOptions.headers, responseType: 'json'});
        } else {
            url = this.baseUrl + 'usuario';
            return this.http.post<Usuario>(url, usuario, {headers: httpOptions.headers, responseType: 'json'});
        }
    }

    destroy(usuario: Usuario): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'usuario/' + usuario.id).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}