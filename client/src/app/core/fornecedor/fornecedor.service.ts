import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Fornecedor} from './fornecedor';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class FornecedorService {

    private baseUrl = 'http://localhost:8080/';

    constructor(private http: Http) {
    }

    list(): Observable<Fornecedor[]> {
        let subject = new Subject<Fornecedor[]>();
        this.http.get(this.baseUrl + 'fornecedor')
            .map((r: Response) => r.json())
            .subscribe((json: any[]) => {
                subject.next(json.map((item: any) => new Fornecedor(item)))
            });
        return subject.asObservable();
    }

    get(id: number): Observable<Fornecedor> {
        return this.http.get(this.baseUrl + 'fornecedor/'+id)
            .map((r: Response) => new Fornecedor(r.json()));
    }

    save(fornecedor: Fornecedor): Observable<Fornecedor> {
        const requestOptions = new RequestOptions();
        if (fornecedor.id) {
            requestOptions.method = RequestMethod.Put;
            requestOptions.url = this.baseUrl + 'fornecedor/' + fornecedor.id;
        } else {
            requestOptions.method = RequestMethod.Post;
            requestOptions.url = this.baseUrl + 'fornecedor';
        }
        requestOptions.body = JSON.stringify(fornecedor);
        requestOptions.headers = new Headers({"Content-Type": "application/json"});

        return this.http.request(new Request(requestOptions))
            .map((r: Response) => new Fornecedor(r.json()));
    }

    destroy(fornecedor: Fornecedor): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'fornecedor/' + fornecedor.id).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}