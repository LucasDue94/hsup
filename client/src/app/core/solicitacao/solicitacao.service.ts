/*
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Solicitacao} from "./solicitacao";
import {Item} from "../itemRequest/itemRequest";
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
        this.http.get(this.baseUrl + `itemRequest?offset=${offset}&max=${max}`, {params: {descricao: searchTerm}})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['itemRequest'].map((itemRequest: any) => new Item(itemRequest)))
            });
        return subject.asObservable();
    }

}
*/
