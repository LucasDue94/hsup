import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Fornecedor } from './fornecedor';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";

@Injectable()
export class FornecedorService {

    private baseUrl = 'http://localhost:8080/';

    constructor(private http: HttpClient) {
    }

    list(max?: any, searchTerm?: string, offset?: number): Observable<Fornecedor[]> {
        let subject = new Subject<Fornecedor[]>();
        this.http.get(this.baseUrl + `fornecedor?offset=${offset}&max=${max}`, {params: {fantasia: searchTerm}})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['fornecedor'].map((item: any) => new Fornecedor(item)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Fornecedor[]>(this.baseUrl + 'fornecedor/')
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<Fornecedor> {
        let fornecedor;
        return this.http.get(this.baseUrl + 'fornecedor/' + id)
            .map((r: Response) => {
                fornecedor = new Fornecedor(r);
                return fornecedor
            });
    }

    save(fornecedor: Fornecedor): Observable<Fornecedor> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };

        let url;

        if (fornecedor.id) {
            url = this.baseUrl + 'fornecedor/' + fornecedor.id;
            return this.http.put<Fornecedor>(url, fornecedor, {headers: httpOptions.headers, responseType: 'json'});
        } else {
            url = this.baseUrl + 'fornecedor';
            return this.http.post<Fornecedor>(url, fornecedor, {headers: httpOptions.headers, responseType: 'json'});
        }
    }

    destroy(fornecedor: Fornecedor): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'fornecedor/' + fornecedor.id).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}