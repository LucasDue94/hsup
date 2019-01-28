import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Produto } from "../produto/produto";
import { Observable, Subject } from "rxjs";
import { Produto } from "../Produto/Produto";

@Injectable({
    providedIn: 'root'
})
export class AlmoxarifeService {

    constructor(private http: HttpClient) {
    }

    headers = new HttpHeaders({'X-Auth-Token': localStorage.getItem('token')});

    private baseUrl = environment.serverUrl;

    search(produtoWpd, offset?, limit?): Observable<Produto[]> {
        if (produtoWpd == '') return null;
        const url = this.baseUrl + 'produto';
        let subject = new Subject<Produto[]>();
        this.http.get(url + `?offset=${offset}`, {
            headers: this.headers,
            params: {termo: produtoWpd}
        }).map((r: HttpResponse<any>) => r)
            .subscribe((json: any) => {
                console.log(json['produto']);
                subject.next(json['produto'].map((item: any) => new Produto(item)))
            });
        return subject.asObservable();
    }

    countList(value, max?) {
        let count: number;
        return this.http.get<Produto[]>(this.baseUrl + `produto?max=${max}`, {
            headers: this.headers,
            params: {termo: value}
        })
            .map(
                data => {
                    count = data['totalFind'];
                    return count;
                }
            );
    }

    count() {
        let quantity: number;
        return this.http.get<Produto[]>(this.baseUrl + 'produto/', {headers: this.headers})
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

}
