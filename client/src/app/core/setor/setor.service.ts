import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Setor } from './setor';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";
import { environment } from "../../../environments/environment";

@Injectable()
export class SetorService {

    private baseUrl = environment.serverUrl;
    headers = new HttpHeaders({'X-Auth-Token': localStorage.getItem('token')});

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<Setor[]> {
        let subject = new Subject<Setor[]>();
        this.http.get(this.baseUrl + `setor?offset=${offset}&max=${max}`, {headers: this.headers})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['setor'].map((setor: any) => new Setor(setor)))
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, limit?): Observable<any[]> {
        if (searchTerm == '') return new Observable();
        const url = this.baseUrl + 'setor';
        let subject = new Subject<Setor[]>();
        this.http.get(url + `?offset=${offset}`, {
            headers: this.headers,
            params: {termo: searchTerm}
        }).map((r: HttpResponse<any>) => r)
            .subscribe((json: any) => {
                subject.next(json['setor'].map((setor: any) => new Setor(setor)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Setor[]>(this.baseUrl + 'setor/', {headers: this.headers})
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<Setor> {
        let setor;
        return this.http.get(this.baseUrl + 'setor/' + id, {headers: this.headers})
            .map((r: Response) => {
                setor = new Setor(r);
                return setor
            });
    }

    save(setor: Setor): Observable<Setor> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "X-Auth-Token": localStorage.getItem('token')
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
        return this.http.delete(this.baseUrl + 'setor/' + setor.id, {headers: this.headers}).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}