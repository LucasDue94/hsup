import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { UnidadeMedida } from './unidadeMedida';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";

@Injectable()
export class UnidadeMedidaService {

    private baseUrl = 'http://localhost:8080/';

    constructor(private http: HttpClient) {
    }

    list(max?: any, fieldSearch?: any, searchTerm?: string, offset?: number): Observable<UnidadeMedida[]> {
        let subject = new Subject<UnidadeMedida[]>();
        this.http.get(this.baseUrl + `unidadeMedida?`, {params: {descricao: searchTerm}})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['unidadeMedida'].map((item: any) => new UnidadeMedida(item)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<UnidadeMedida[]>(this.baseUrl + 'unidadeMedida/')
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<UnidadeMedida> {
        let unidadeMedida;
        return this.http.get(this.baseUrl + 'unidadeMedida/' + id)
            .map((r: Response) => {
                unidadeMedida = new UnidadeMedida(r);
                return unidadeMedida
            });
    }

    save(unidadeMedida: UnidadeMedida): Observable<UnidadeMedida> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };

        let url;

        if (unidadeMedida.id) {
            url = this.baseUrl + 'unidadeMedida/' + unidadeMedida.id;
            return this.http.put<UnidadeMedida>(url, unidadeMedida, {headers: httpOptions.headers, responseType: 'json'});
        } else {
            url = this.baseUrl + 'unidadeMedida';
            return this.http.post<UnidadeMedida>(url, unidadeMedida, {headers: httpOptions.headers, responseType: 'json'});
        }
    }

    destroy(unidadeMedida: UnidadeMedida): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'unidadeMedida/' + unidadeMedida.id).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}