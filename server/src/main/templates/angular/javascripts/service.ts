import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ${className} } from './${propertyName}';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import "rxjs-compat/add/operator/map";

@Injectable()
export class ${className}Service {

    private baseUrl = 'http://localhost:8080/';

    constructor(private http: HttpClient) {
    }

    list(max?: any, fieldSearch?: any, searchTerm?: string, offset?: number): Observable<${className}[]> {
        let subject = new Subject<${className}[]>();
        this.http.get(this.baseUrl + `${propertyName}?offset={offset}&max={max}`, {params: {fieldSearch: searchTerm}})
            .map((r: Response) => r)
            .subscribe((json: any) => {
                subject.next(json['${propertyName}'].map((item: any) => new ${className}(item)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<${className}[]>(this.baseUrl + '${propertyName}/')
            .map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            );
    }

    get(id: number): Observable<${className}> {
        let ${propertyName};
        return this.http.get(this.baseUrl + '${propertyName}/' + id)
            .map((r: Response) => {
                ${propertyName} = new ${className}(r);
                return ${propertyName}
            });
    }

    save(${propertyName}: ${className}): Observable<${className}> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };

        let url;

        if (${propertyName}.id) {
            url = this.baseUrl + '${propertyName}/' + ${propertyName}.id;
            return this.http.put<${className}>(url, ${propertyName}, {headers: httpOptions.headers, responseType: 'json'});
        } else {
            url = this.baseUrl + '${propertyName}';
            return this.http.post<${className}>(url, ${propertyName}, {headers: httpOptions.headers, responseType: 'json'});
        }
    }

    destroy(${propertyName}: ${className}): Observable<boolean> {
        return this.http.delete(this.baseUrl + '${propertyName}/' + ${propertyName}.id).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}