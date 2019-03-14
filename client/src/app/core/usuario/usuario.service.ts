import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";
import { environment } from "../../../environments/environment";

@Injectable()
export class UsuarioService {

    private baseUrl = environment.serverUrl;
    headers = new HttpHeaders({'X-Auth-Token': localStorage.getItem('token')});

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<Usuario[]> {
        let subject = new Subject<Usuario[]>();
        this.http.get(this.baseUrl + `usuario?offset=${offset}&max=${max}`, {headers: this.headers})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['usuario'].map((usuario: any) => new Usuario(usuario)))
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, limit?): Observable<any[]> {
        if (searchTerm == '') return new Observable();
        const url = this.baseUrl + 'usuario';
        let subject = new Subject<Usuario[]>();
        this.http.get(url + `?offset=${offset}`, {
            headers: this.headers,
            params: {termo: searchTerm}
        }).map((r: HttpResponse<any>) => r)
            .subscribe((json: any) => {
                subject.next(json['usuario'].map((usuario: any) => new Usuario(usuario)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Usuario[]>(this.baseUrl + 'usuario/', {headers: this.headers})
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<Usuario> {
        let usuario;
        return this.http.get(this.baseUrl + 'usuario/' + id, {headers: this.headers})
            .map((r: Response) => {
                usuario = new Usuario(r);
                return usuario
            });
    }

    save(usuario: Usuario): Observable<Usuario> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "X-Auth-Token": localStorage.getItem('token')
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
        return this.http.delete(this.baseUrl + 'usuario/' + usuario.id, {headers: this.headers}).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}