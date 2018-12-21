import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Perfil } from "../core/perfil/perfil";

@Injectable()
export class AuthService {

    private baseUrl = environment.serverUrl;

    private logged = new BehaviorSubject<boolean>(false);

    get isLogged() {
        return this.isLogged.asObservable();
    }

    constructor(private http: HttpClient) {
    }

    authentication(user) {
        const httpOptions = {
            headers: new HttpHeaders({
                "Accept": "application/json",
                "Content-Type": "application/json"
            })
        };

        const url = this.baseUrl + 'login';
        const data = {
            "username": user.username,
            "password": user.password
        };

        this.http.post(url, data, {headers: httpOptions.headers, responseType: 'json'}).subscribe(
            data => console.log(data)
        );
    }
}
