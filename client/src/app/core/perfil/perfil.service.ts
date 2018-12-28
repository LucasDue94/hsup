import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Perfil } from './perfil';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";

@Injectable()
export class PerfilService {

    private baseUrl = 'http://localhost:8080/';

    constructor(private http: HttpClient) {
    }

    list(max?: any, fieldSearch?: any, searchTerm?: string, offset?: number): Observable<Perfil[]> {
        let subject = new Subject<Perfil[]>();
        this.http.get(this.baseUrl + `perfil?offset=${offset}&max=${max}`, {params: {fieldSearch: searchTerm}})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['perfil'].map((item: any) => new Perfil(item)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Perfil[]>(this.baseUrl + 'perfil/')
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<Perfil> {
        let perfil;
        return this.http.get(this.baseUrl + 'perfil/' + id)
            .map((r: Response) => {
                perfil = new Perfil(r);
                return perfil
            });
    }

    save(perfil: Perfil): Observable<Perfil> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };

        let url;

        if (perfil.id) {
            url = this.baseUrl + 'perfil/' + perfil.id;
            return this.http.put<Perfil>(url, perfil, {headers: httpOptions.headers, responseType: 'json'});
        } else {
            url = this.baseUrl + 'perfil';
            return this.http.post<Perfil>(url, perfil, {headers: httpOptions.headers, responseType: 'json'});
        }
    }

    destroy(perfil: Perfil): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'perfil/' + perfil.id).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}