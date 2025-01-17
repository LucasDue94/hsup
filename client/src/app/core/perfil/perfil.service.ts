import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Perfil } from './perfil';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";
import { environment } from "../../../environments/environment";

@Injectable()
export class PerfilService {

    private baseUrl = environment.serverUrl;
    headers = new HttpHeaders({'X-Auth-Token': localStorage.getItem('token')});

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<Perfil[]> {
        let subject = new Subject<Perfil[]>();
        this.http.get(this.baseUrl + `perfil?offset=${offset}&max=${max}`, {headers: this.headers})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['perfil'].map((perfil: any) => new Perfil(perfil)))
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, limit?): Observable<any[]> {
        if (searchTerm == '') return new Observable();
        const url = this.baseUrl + 'perfil';
        let subject = new Subject<Perfil[]>();
        this.http.get(url + `?offset=${offset}`, {
            headers: this.headers,
            params: {termo: searchTerm}
        }).map((r: HttpResponse<any>) => r)
            .subscribe((json: any) => {
                subject.next(json['perfil'].map((perfil: any) => new Perfil(perfil)))
            });
        return subject.asObservable();
    }
    count() {
        let quantity: number;
        return this.http.get<Perfil[]>(this.baseUrl + 'perfil/', {headers: this.headers})
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<Perfil> {
        let perfil;
        return this.http.get(this.baseUrl + 'perfil/' + id, {headers: this.headers})
            .map((r: Response) => {
                perfil = new Perfil(r);
                return perfil
            });
    }

    save(perfil: Perfil): Observable<Perfil> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "X-Auth-Token": localStorage.getItem('token')
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
        return this.http.delete(this.baseUrl + 'perfil/' + perfil.id, {headers: this.headers}).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}