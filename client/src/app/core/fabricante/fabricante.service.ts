import { Injectable } from '@angular/core';
import { Headers, Request, RequestMethod, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Fabricante } from './fabricante';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class FabricanteService {

    private baseUrl = 'http://localhost:8080/';

    constructor(private http: HttpClient) {
    }

    list(offset?: number): Observable<Fabricante[]> {
        let subject = new Subject<Fabricante[]>();
        this.http.get(this.baseUrl + 'fabricante?offset='+offset)
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['fabricante'].map((item: any) => new Fabricante(item)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Fabricante[]>(this.baseUrl + 'fabricante/')
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<Fabricante> {
        return this.http.get(this.baseUrl + 'fabricante/' + id)
            .map((r: Response) => new Fabricante(r.json()));
    }

    save(fabricante: Fabricante): Observable<Fabricante> {
        const requestOptions = new RequestOptions();
        if (fabricante.id) {
            requestOptions.method = RequestMethod.Put;
            requestOptions.url = this.baseUrl + 'fabricante/' + fabricante.id;
        } else {
            requestOptions.method = RequestMethod.Post;
            requestOptions.url = this.baseUrl + 'fabricante';
        }
        requestOptions.body = JSON.stringify(fabricante);
        requestOptions.headers = new Headers({"Content-Type": "application/json"});

        return this.http.request(new Request(requestOptions))
            .map((r: Response) => new Fabricante(r.json()));
    }

    destroy(fabricante: Fabricante): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'fabricante/' + fabricante.id).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}