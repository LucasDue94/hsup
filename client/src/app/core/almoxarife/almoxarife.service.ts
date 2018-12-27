import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Response } from "@angular/http";
import { Produto } from "../produto/produto";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AlmoxarifeService {

    private baseUrl = environment.serverUrl;

    constructor(private http: HttpClient) {
    }

    search(produtoWpd) {
        if(produtoWpd == '') return [];
        const url = this.baseUrl + 'produto';
        let subject = new Subject<Produto[]>();
        this.http.get(url, {params: {termo: produtoWpd}}).map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['produto'].map((item: any) => new Produto(item)))
            });
        return subject.asObservable();
    }
}
