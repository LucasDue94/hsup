import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Fabricante } from './fabricante';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class FabricanteService {

    private baseUrl = 'http://localhost:8080/';

    constructor(private http: HttpClient) {
    }

    list(max?: any, searchTerm?: string, offset?: number): Observable<Fabricante[]> {
        let subject = new Subject<Fabricante[]>();
        this.http.get(this.baseUrl + `fabricante?offset=${offset}&max=${max}`, {params: {fantasia: searchTerm}})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['fabricante'].map((item: any) => new Fabricante(item)))
            });
        return subject.asObservable();
    }

    /*getAll(max?: number, searchTerm?: string) {
        let subject = new Subject<fabricante[]>();
        this.http.get(this.baseUrl + 'fabricante?max='+max+'&fantasia='+searchTerm)
            .map((r: Response) => r)
            .subscribe((json: any) => {
               subject.next(json['fabricante'].map((item: any) => new fabricante(item)))
            });
        return subject.asObservable();
    }*/

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
        let fabricante;
        return this.http.get(this.baseUrl + 'fabricante/' + id)
            .map((r: Response) => {
                fabricante = new Fabricante(r);
                return fabricante
            });
    }

    save(fabricante: Fabricante): Observable<Fabricante> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };

        let url;

        if (fabricante.id) {
            url = this.baseUrl + 'fabricante/' + fabricante.id;
            return this.http.put<Fabricante>(url, fabricante, {headers: httpOptions.headers, responseType: 'json'});
        } else {
            url = this.baseUrl + 'fabricante';
            return this.http.post<Fabricante>(url, fabricante, {headers: httpOptions.headers, responseType: 'json'});
        }

    }

    destroy(fabricante: Fabricante): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'fabricante/' + fabricante.id).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}