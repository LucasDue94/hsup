import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Produto } from "../produto/produto";
import { Observable, Subject } from "rxjs";
import { Fabricante } from "../fabricante/fabricante";
import { Response } from "@angular/http";
import { Solicitacao } from "../solicitacao/solicitacao";

@Injectable({
    providedIn: 'root'
})
export class AlmoxarifeService {

    constructor(private http: HttpClient) {
    }

    headers = new HttpHeaders({'X-Auth-Token': localStorage.getItem('token')});

    private baseUrl = environment.serverUrl;

    search(produtoWpd, offset?): Observable<any[]> {
        if (produtoWpd == '') return new Observable();
        let subject = new Subject<Produto[]>();
        const url = this.baseUrl + 'produto';
        this.http.get(url + `?offset=${offset}`, {
            headers: this.headers,
            params: {termo: produtoWpd}
        }).map((r: HttpResponse<any>) => r)
            .subscribe((json: any) => {
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
                    count = data['countList'];
                    return count;
                }
            );
    }

    get(id: number): Observable<Solicitacao> {
        let solicitacao;
        return this.http.get(this.baseUrl + 'solicitacao/' + id, {headers: this.headers})
            .map((r: Response) => {
                solicitacao = new Fabricante(r);
                return solicitacao
            });
    }

    count() {
        let count: number;
        return this.http.get<Produto[]>(this.baseUrl + 'produto/', {headers: this.headers})
            .map(
                data => {
                    count = data['total'];
                    return count;
                }
            );
    }

}
