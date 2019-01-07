/*
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Solicitacao} from "./solicitacao";
import {Item} from "../item/item";
import {Subject} from "rxjs/Subject";
import {Response} from "@angular/http";

@Injectable({
  providedIn: 'root'
})

export class SolicitacaoService {

    private baseUrl = 'http://localhost:8080/';

    constructor(private http: HttpClient) {
    }

    list(): Observable<> {
        let subject = new Subject<Item[]>();
        this.http.get(this.baseUrl + `item?offset=${offset}&max=${max}`, {params: {descricao: searchTerm}})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['item'].map((item: any) => new Item(item)))
            });
        return subject.asObservable();
    }

}
*/
