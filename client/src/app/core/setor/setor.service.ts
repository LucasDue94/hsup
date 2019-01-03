import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Setor } from './setor';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";

@Injectable()
export class SetorService {

    private baseUrl = 'http://localhost:8080/';

    constructor(private http: HttpClient) {
    }

    list(max?: any, searchTerm?: string, offset?: any): Observable<Setor[]> {
        let subject = new Subject<Setor[]>();
        this.http.get(this.baseUrl + `setor?offset=${offset}&max=${max}`, {params: {nome: searchTerm}})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['setor'].map((item: any) => new Setor(item)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Setor[]>(this.baseUrl + 'setor/')
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<Setor> {
        let setor;
        return this.http.get(this.baseUrl + 'setor/' + id)
            .map((r: Response) => {
                setor = new Setor(r);
                return setor
            });
    }

    save(setor: Setor): Observable<Setor> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };

        let url;

        if (setor.id) {
            url = this.baseUrl + 'setor/' + setor.id;
            return this.http.put<Setor>(url, setor, {headers: httpOptions.headers, responseType: 'json'});
        } else {
            url = this.baseUrl + 'setor';
            return this.http.post<Setor>(url, setor, {headers: httpOptions.headers, responseType: 'json'});
        }
    }

    destroy(setor: Setor): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'setor/' + setor.id).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}