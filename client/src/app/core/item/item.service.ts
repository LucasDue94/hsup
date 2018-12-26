import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Item } from './item';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";
import {Fabricante} from "../fabricante/fabricante";

@Injectable()
export class ItemService {

    private baseUrl = 'http://localhost:8080/';

    constructor(private http: HttpClient) {
    }

    list(max?: any, searchTerm?: string, offset?: number): Observable<Item[]> {
        let subject = new Subject<Item[]>();
        this.http.get(this.baseUrl + `item?offset=${offset}&max=${max}`, {params: {descricao: searchTerm}})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['item'].map((item: any) => new Item(item)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Item[]>(this.baseUrl + 'item/')
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<Item> {
        let item;
        return this.http.get(this.baseUrl + 'item/' + id)
            .map((r: Response) => {
                item = new Item(r);
                return item
            });
    }

    save(item: Item): Observable<Item> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };

        let url;

        if (item.id) {
            url = this.baseUrl + 'item/' + item.id;
            return this.http.put<Item>(url, item, {headers: httpOptions.headers, responseType: 'json'});
        }else {
            url = this.baseUrl + 'item';
            return this.http.post<Item>(url, item, {headers: httpOptions.headers, responseType: 'json'});
        }
    }

    destroy(item: Item): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'item/' + item.id).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}