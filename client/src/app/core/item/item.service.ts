import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Item } from './item';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";
import { environment } from "../../../environments/environment";

@Injectable()
export class ItemService {

    private baseUrl = environment.serverUrl;
    headers = new HttpHeaders({'X-Auth-Token': localStorage.getItem('token')});

    constructor(private http?: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<Item[]> {
        let subject = new Subject<Item[]>();
        this.http.get(this.baseUrl + `item?offset=${offset}&max=${max}`, {headers: this.headers})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['item'].map((item: any) => new Item(item)))
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, limit?): Observable<any[]> {
        if (searchTerm == '') return new Observable();
        const url = this.baseUrl + 'item';
        let subject = new Subject<Item[]>();
        this.http.get(url + `?offset=${offset}`, {
            headers: this.headers,
            params: {termo: searchTerm}
        }).map((r: HttpResponse<any>) => r)
            .subscribe((json: any) => {
                subject.next(json['item'].map((item: any) => new Item(item)))
            });
        return subject.asObservable();
    }
    count() {
        let quantity: number;
        return this.http.get<Item[]>(this.baseUrl + 'item/', {headers: this.headers})
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<any> {
        let item;
        return this.http.get(this.baseUrl + 'item/' + id, {headers: this.headers})
            .map((r: Response) => {
                item = new Item(r);
                return item
            });
    }

    save(item: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "X-Auth-Token": localStorage.getItem('token')
            })
        };

        let url;

        if (item.id) {
            url = this.baseUrl + 'item/' + item.id;
            return this.http.put<Item>(url, item, {headers: httpOptions.headers, responseType: 'json'});
        } else {
            url = this.baseUrl + 'item';
            return this.http.post<Item>(url, item, {headers: httpOptions.headers, responseType: 'json'});
        }
    }

    destroy(item: Item): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'item/' + item.id, {headers: this.headers}).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}