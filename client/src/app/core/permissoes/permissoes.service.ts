import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Permissoes } from './permissoes';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";

@Injectable()
export class PermissoesService {

    private baseUrl = 'http://localhost:8080/';

    constructor(private http: HttpClient) {
    }

    list(max?: any, searchTerm?: string, offset?: any): Observable<Permissoes[]> {
        let subject = new Subject<Permissoes[]>();
        this.http.get(this.baseUrl + `permissoes?offset=${offset}&max=${max}`)
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['permissoes'].map((item: any) => new Permissoes(item)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Permissoes[]>(this.baseUrl + 'permissoes/')
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<Permissoes> {
        let permissoes;
        return this.http.get(this.baseUrl + 'permissoes/' + id)
            .map((r: Response) => {
                permissoes = new Permissoes(r);
                return permissoes
            });
    }

    save(permissoes: Permissoes): Observable<Permissoes> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
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
        return this.http.delete(this.baseUrl + 'permissoes/' + permissoes.id).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}