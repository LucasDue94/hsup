import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Produto } from "../produto/produto";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AlmoxarifeService {

    constructor(private http: HttpClient) {
    }

    private baseUrl = environment.serverUrl;

    search(produtoWpd, offset?, limit?) {
        if (produtoWpd == '') return [];
        const url = this.baseUrl + 'produto';
        let subject = new Subject<Produto[]>();
        this.http.get(url + `?offset=${offset}&max=${limit}` , {params: {termo: produtoWpd}}).map((r: HttpResponse<any>) => r)
            .subscribe((json: any) => {
                subject.next(json['produto'].map((item: any) => new Produto(item)))
            });
        return subject.asObservable();
    }
}
