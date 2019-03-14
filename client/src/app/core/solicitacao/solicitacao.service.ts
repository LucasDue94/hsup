import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Solicitacao } from './solicitacao';
import { Response } from "@angular/http";

@Injectable({
    providedIn: 'root'
})
export class SolicitacaoService {

    private baseUrl = environment.serverUrl;
    headers = new HttpHeaders({'X-Auth-Token': localStorage.getItem('token')});

    constructor(private http: HttpClient) {
    }

    list(max?: any, searchTerm?: string, offset?: any): Observable<Solicitacao[]> {
        let subject = new Subject<Solicitacao[]>();
        this.http.get(this.baseUrl + `solicitacao?offset=${offset}&max=${max}`, {headers: this.headers})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['solicitacao'].map((item: any) => new Solicitacao(item)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Solicitacao[]>(this.baseUrl + 'solicitacao/', {headers: this.headers})
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<Solicitacao> {
        let solicitacao;
        return this.http.get(this.baseUrl + 'solicitacao/' + id, {headers: this.headers})
            .map((r: Response) => {
                solicitacao = new Solicitacao(r);
                return solicitacao
            });
    }

    save(solicitacao: Solicitacao): Observable<Solicitacao> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "X-Auth-Token": localStorage.getItem('token')
            })
        };

        let url;

        if (solicitacao.id) {
            url = this.baseUrl + 'solicitacao/' + solicitacao.id;
            return this.http.put<Solicitacao>(url, solicitacao, {headers: httpOptions.headers, responseType: 'json'});
        } else {
            url = this.baseUrl + 'solicitacao';
            return this.http.post<Solicitacao>(url, solicitacao, {headers: httpOptions.headers, responseType: 'json'});
        }
    }

    destroy(solicitacao: Solicitacao): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'solicitacao/' + solicitacao.id, {headers: this.headers}).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}
