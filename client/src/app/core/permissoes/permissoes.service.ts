import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Permissoes } from './permissoes';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";

@Injectable()
export class PermissoesService {

    private baseUrl = 'http://localhost:8080/';
    headers = new HttpHeaders({'X-Auth-Token': localStorage.getItem('token')});

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<Permissoes[]> {
        let subject = new Subject<Permissoes[]>();
        this.http.get(this.baseUrl + `permissoes?offset=${offset}&max=${max}`, {headers: this.headers})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['permissoes'].map((permissoes: any) => new Permissoes(permissoes)))
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, limit?): Observable<any[]> {
        if (searchTerm == '') return new Observable();
        const url = this.baseUrl + 'permissoes';
        let subject = new Subject<Permissoes[]>();
        this.http.get(url + `?offset=${offset}`, {
            headers: this.headers,
            params: {termo: searchTerm}
        }).map((r: HttpResponse<any>) => r)
            .subscribe((json: any) => {
                subject.next(json['permissoes'].map((permissoes: any) => new Permissoes(permissoes)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Permissoes[]>(this.baseUrl + 'permissoes/', {headers: this.headers})
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<Permissoes> {
        let permissoes;
        return this.http.get(this.baseUrl + 'permissoes/' + id, {headers: this.headers})
            .map((r: Response) => {
                permissoes = new Permissoes(r);
                return permissoes
            });
    }

    save(permissoes: Permissoes): Observable<Permissoes> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "X-Auth-Token": localStorage.getItem('token')
            })
        };

        let url;

        if (permissoes.id) {
            url = this.baseUrl + 'permissoes/' + permissoes.id;
            return this.http.put<Permissoes>(url, permissoes, {headers: httpOptions.headers, responseType: 'json'});
        } else {
            url = this.baseUrl + 'permissoes';
            return this.http.post<Permissoes>(url, permissoes, {headers: httpOptions.headers, responseType: 'json'});
        }
    }

    destroy(permissoes: Permissoes): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'permissoes/' + permissoes.id, {headers: this.headers}).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}