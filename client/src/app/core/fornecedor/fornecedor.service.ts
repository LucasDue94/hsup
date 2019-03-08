import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Fornecedor } from './fornecedor';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";
import { environment } from "../../../environments/environment";
import { Item } from "../item/item";
import { Fabricante } from "../fabricante/fabricante";

@Injectable()
export class FornecedorService {

    private baseUrl = environment.serverUrl;
    headers = new HttpHeaders({'X-Auth-Token': localStorage.getItem('token')});

    constructor(private http: HttpClient) {
    }

    list(max?: any, searchTerm?: string, offset?: any): Observable<Fornecedor[]> {
        let subject = new Subject<Fornecedor[]>();
        this.http.get(this.baseUrl + `fornecedor?offset=${offset}&max=${max}`, {headers: this.headers, params: {fantasia: searchTerm}})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['fornecedor'].map((item: any) => new Fornecedor(item)))
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, limit?): Observable<any[]> {
        if (searchTerm == '') return new Observable();
        const url = this.baseUrl + 'fornecedor';
        let subject = new Subject<Fornecedor[]>();
        this.http.get(url + `?offset=${offset}`, {headers: this.headers, params: {termo: searchTerm}}).map((r: HttpResponse<any>) => r)
            .subscribe((json: any) => {
                subject.next(json['fornecedor'].map((item: any) => new Fornecedor(item)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Fornecedor[]>(this.baseUrl + 'fornecedor/', {headers: this.headers})
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<any> {
        let fornecedor;
        return this.http.get(this.baseUrl + 'fornecedor/' + id, {headers: this.headers})
            .map((r: Response) => {
                fornecedor = new Fornecedor(r);
                return fornecedor
            });
    }

    save(fornecedor: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "X-Auth-Token": localStorage.getItem('token')
            })
        };

        let url;

        if (fornecedor.id) {
            url = this.baseUrl + 'fornecedor/' + fornecedor.id;
            return this.http.put(url, fornecedor, {headers: httpOptions.headers, responseType: 'json'});
        } else {
            url = this.baseUrl + 'fornecedor';
            return this.http.post(url, fornecedor, {headers: httpOptions.headers, responseType: 'json'});
        }
    }

    destroy(fornecedor: Fornecedor): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'fornecedor/' + fornecedor.id).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}