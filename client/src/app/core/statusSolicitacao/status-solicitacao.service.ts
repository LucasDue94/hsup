import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Response } from "@angular/http";
import { StatusSolicitacao } from './status-solicitacao'
import { Status } from "tslint/lib/runner";

@Injectable({
    providedIn: 'root'
})
export class StatusSolicitacaoService {

    private baseUrl = environment.serverUrl;
    headers = new HttpHeaders({'X-Auth-Token': localStorage.getItem('token')});

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<Status[]> {
        let subject = new Subject<Status[]>();
        this.http.get(this.baseUrl + `status?offset=${offset}&max=${max}`, {headers: this.headers})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['status'].map((statusSolicitacao: any) => new StatusSolicitacao(statusSolicitacao)))
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, limit?): Observable<any[]> {
        if (searchTerm == '') return new Observable();
        const url = this.baseUrl + 'status';
        let subject = new Subject<Status[]>();
        this.http.get(url + `?offset=${offset}`, {
            headers: this.headers,
            params: {termo: searchTerm}
        }).map((r: HttpResponse<any>) => r)
            .subscribe((json: any) => {
                subject.next(json['status'].map((statusSolicitacao: any) => new StatusSolicitacao(statusSolicitacao)))
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
