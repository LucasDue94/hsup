import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { SolicitacaoItem } from './solicitacao-item';
import { Response } from "@angular/http";

@Injectable({
    providedIn: 'root'
})
export class SolicitacaoItemService {

    private baseUrl = environment.serverUrl;
    headers = new HttpHeaders({'X-Auth-Token': localStorage.getItem('token')});

    constructor(private http: HttpClient) {
    }

    list(max?: any, searchTerm?: string, offset?: any): Observable<SolicitacaoItem[]> {
        let subject = new Subject<SolicitacaoItem[]>();
        this.http.get(this.baseUrl + `solicitacaoItem?offset=${offset}&max=${max}`, {headers: this.headers, params: {nome: searchTerm}})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['solicitacaoItem'].map((item: any) => new SolicitacaoItem(item)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<SolicitacaoItem[]>(this.baseUrl + 'solicitacaoItem/', {headers: this.headers})
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<SolicitacaoItem> {
        let solicitacaoItem;
        return this.http.get(this.baseUrl + 'solicitacaoItem/' + id, {headers: this.headers})
            .map((r: Response) => {
                solicitacaoItem = new SolicitacaoItem(r);
                return solicitacaoItem
            });
    }

    save(solicitacaoItem: SolicitacaoItem): Observable<SolicitacaoItem> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "X-Auth-Token": localStorage.getItem('token')
            })
        };

        let url;

        if (solicitacaoItem.id) {
            url = this.baseUrl + 'solicitacaoItem/' + solicitacaoItem.id;
            return this.http.put<SolicitacaoItem>(url, solicitacaoItem, {headers: httpOptions.headers, responseType: 'json'});
        } else {
            url = this.baseUrl + 'solicitacaoItem';
            return this.http.post<SolicitacaoItem>(url, solicitacaoItem, {headers: httpOptions.headers, responseType: 'json'});
        }
    }

    destroy(solicitacaoItem: SolicitacaoItem): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'solicitacaoItem/' + solicitacaoItem.id, {headers: this.headers}).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}
