import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Solicitacao } from './solicitacao';
import { Response } from "@angular/http";

@Injectable({
    providedIn: 'root'
})
export class SolicitacaoService {

    private baseUrl = environment.serverUrl;
    headers = new HttpHeaders({'X-Auth-Token': localStorage.getItem('token')});
    httpOptions = {
        headers: new HttpHeaders({
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "X-Auth-Token": localStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any, perfil?: any): Observable<Solicitacao[]> {
        let subject = new Subject<Solicitacao[]>();
        this.http.get(this.baseUrl + `solicitacao?offset=${offset}&max=${max}&perfil=${perfil}`, {headers: this.headers})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['solicitacao'].map((solicitacao: any) => new Solicitacao(solicitacao)))
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, limit?): Observable<any[]> {
        if (searchTerm == '') return new Observable();
        const url = this.baseUrl + 'solicitacao';
        let subject = new Subject<Solicitacao[]>();
        this.http.get(url + `?offset=${offset}`, {
            headers: this.headers,
            params: {termo: searchTerm}
        }).map((r: HttpResponse<any>) => r)
            .subscribe((json: any) => {
                subject.next(json['solicitacao'].map((solicitacao: any) => new Solicitacao(solicitacao)))
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

    countAlmoxarife() {
        let quantity: number;
        return this.http.get<Solicitacao[]>(this.baseUrl + 'solicitacao/listAlmoxarife/', {headers: this.headers})
            .map(
                data => {
                    quantity = data['solicitacaoCount'];
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

    changeStatus(solicitacao: Solicitacao): Observable<Solicitacao> {
        delete solicitacao.itens;
        const solicitacaoStatus = {id: solicitacao.id, status: +solicitacao.status};
        const url = this.baseUrl + 'solicitacao/changeStatus/' + solicitacao.id + `/${solicitacao.status}`;
        return this.http.put<Solicitacao>(url, solicitacaoStatus,
            {headers: this.httpOptions.headers, responseType: 'json'});
    }

    save(solicitacao: Solicitacao): Observable<Solicitacao> {
        let url;

        if (solicitacao.id) {
            url = this.baseUrl + 'solicitacao/' + solicitacao.id;
            return this.http.put<Solicitacao>(url, solicitacao, {
                headers: this.httpOptions.headers,
                responseType: 'json'
            });
        } else {
            url = this.baseUrl + 'solicitacao';
            return this.http.post<Solicitacao>(url, solicitacao, {
                headers: this.httpOptions.headers,
                responseType: 'json'
            });
        }
    }

    cancel(solicitacao: Solicitacao): Observable<Solicitacao> {
        if (solicitacao.id) {
            const url = this.baseUrl + 'solicitacao/cancel/' + solicitacao.id;
            return this.http.put<Solicitacao>(url, solicitacao.id, {
                headers: this.httpOptions.headers,
                responseType: 'json'
            });
        }
    }

    deny(solicitacao: Solicitacao): Observable<Solicitacao> {
        if (solicitacao.id) {
            const url = this.baseUrl + 'solicitacao/deny/' + solicitacao.id;
            return this.http.put<Solicitacao>(url, solicitacao.id, {
                headers: this.httpOptions.headers,
                responseType: 'json'
            });
        }
    }

    approval(solicitacao: Solicitacao): Observable<Solicitacao> {
        if (solicitacao.id) {
            const url = this.baseUrl + 'solicitacao/approval/' + solicitacao.id;
            return this.http.put<Solicitacao>(url, solicitacao.id, {
                headers: this.httpOptions.headers,
                responseType: 'json'
            });
        }
    }

    finish(solicitacao: Solicitacao): Observable<Solicitacao> {
        if (solicitacao.id) {
            const url = this.baseUrl + 'solicitacao/finish/' + solicitacao.id;
            return this.http.put<Solicitacao>(url, solicitacao.id, {headers: this.httpOptions.headers, responseType: 'json'});
        }
    }

    destroy(solicitacao: Solicitacao): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'solicitacao/' + solicitacao.id, {headers: this.headers}).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}
