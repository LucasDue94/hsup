import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { Fabricante } from './fabricante';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";
import { environment } from "../../../environments/environment";

@Injectable()
export class FabricanteService {

    headers = new HttpHeaders({'X-Auth-Token': localStorage.getItem('token')});
    private baseUrl = environment.serverUrl;

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<Fabricante[]> {
        let subject = new Subject<Fabricante[]>();
        this.http.get(this.baseUrl + `fabricante?offset=${offset}&max=${max}`, {headers: this.headers})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['fabricante'].map((fabricante: any) => new Fabricante(fabricante)))
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, limit?): Observable<any[]> {
        if (searchTerm == '') return new Observable();
        const url = this.baseUrl + 'fabricante';
        let subject = new Subject<Fabricante[]>();
        this.http.get(url + `?offset=${offset}`, {
            headers: this.headers,
            params: {termo: searchTerm}
        }).map((r: HttpResponse<any>) => r)
            .subscribe((json: any) => {
                subject.next(json['fabricante'].map((fabricante: any) => new Fabricante(fabricante)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Fabricante[]>(this.baseUrl + 'fabricante/', {headers: this.headers})
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<any> {
        let fabricante;
        return this.http.get(this.baseUrl + 'fabricante/' + id, {headers: this.headers})
            .map((r: Response) => {
                fabricante = new Fabricante(r);
                return fabricante
            });
    }

    save(fabricante: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "X-Auth-Token": localStorage.getItem('token')
            }),
        };

        let url;

        if (fabricante.id) {
            url = this.baseUrl + 'fabricante/' + fabricante.id;
            return this.http.put(url, fabricante, {headers: httpOptions.headers, responseType: 'json'});
        } else {
            url = this.baseUrl + 'fabricante';
            return this.http.post(url, fabricante, {headers: httpOptions.headers, responseType: 'json'});
        }

    }

    destroy(fabricante: Fabricante): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'fabricante/' + fabricante.id, {headers: this.headers}).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}