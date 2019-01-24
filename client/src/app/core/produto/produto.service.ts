import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Produto } from './produto';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";

@Injectable()
export class ProdutoService {

    private baseUrl = 'http://localhost:8080/';

    constructor(private http: HttpClient) {
    }

    list(max?: any, fieldSearch?: any, searchTerm?: string, offset?: number): Observable<Produto[]> {
        let subject = new Subject<Produto[]>();
        this.http.get(this.baseUrl + `produto?offset=${offset}&max=${max}`, {params: {fieldSearch: searchTerm}})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['produto'].map((item: any) => new Produto(item)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Produto[]>(this.baseUrl + 'produto/')
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }


    get(id: number): Observable<Produto> {
        let produto;
        return this.http.get(this.baseUrl + 'produto/' + id)
            .map((r: Response) => {
                produto = new Produto(r);
                return produto
            });
    }

    save(produto: Produto): Observable<Produto> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };

        let url;

        if (produto.id) {
            url = this.baseUrl + 'produto/' + produto.id;
            return this.http.put<Produto>(url, produto, {headers: httpOptions.headers, responseType: 'json'});
        } else {
            url = this.baseUrl + 'produto';
            return this.http.post<Produto>(url, produto, {headers: httpOptions.headers, responseType: 'json'});
        }
    }

    destroy(produto: Produto): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'produto/' + produto.id).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}