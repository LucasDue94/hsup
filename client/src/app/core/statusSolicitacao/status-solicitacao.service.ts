import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Response } from "@angular/http";
import { StatusSolicitacao } from './status-solicitacao'

@Injectable({
    providedIn: 'root'
})
export class StatusSolicitacaoService {

    private baseUrl = environment.serverUrl;
    headers = new HttpHeaders({'X-Auth-Token': localStorage.getItem('token')});

    constructor(private http: HttpClient) {
    }

    list(max?: any, searchTerm?: string, offset?: any): Observable<StatusSolicitacao[]> {
        let subject = new Subject<StatusSolicitacao[]>();
        this.http.get(this.baseUrl + `statusSolicitacao?offset=${offset}&max=${max}`, {
            headers: this.headers,
            params: {nome: searchTerm}
        })
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['statusSolicitacao'].map((item: any) => new StatusSolicitacao(item)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<StatusSolicitacao[]>(this.baseUrl + 'statusSolicitacao/', {headers: this.headers})
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<StatusSolicitacao> {
        let statusSolicitacao;
        return this.http.get(this.baseUrl + 'statusSolicitacao/' + id, {headers: this.headers})
            .map((r: Response) => {
                statusSolicitacao = new StatusSolicitacao(r);
                return statusSolicitacao
            });
    }

    save(statusSolicitacao: StatusSolicitacao): Observable<StatusSolicitacao> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "X-Auth-Token": localStorage.getItem('token')
            })
        };

        let url;

        if (statusSolicitacao.id) {
            url = this.baseUrl + 'statusSolicitacao/' + statusSolicitacao.id;
            return this.http.put<StatusSolicitacao>(url, statusSolicitacao, {
                headers: httpOptions.headers,
                responseType: 'json'
            });
        } else {
            url = this.baseUrl + 'statusSolicitacao';
            return this.http.post<StatusSolicitacao>(url, statusSolicitacao, {
                headers: httpOptions.headers,
                responseType: 'json'
            });
        }
    }

    destroy(statusSolicitacao: StatusSolicitacao): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'statusSolicitacao/' + statusSolicitacao.id, {headers: this.headers}).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}
