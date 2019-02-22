import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

    private baseUrl = environment.serverApiUrl;
    token: string;

    httpOptions = {
        headers: new HttpHeaders({
            "Accept": "application/json",
            "Content-Type": "application/json",
        })
    };

    constructor(private http?: HttpClient, private router?: Router) {}

    authentication(user) {
        const url = this.baseUrl + 'login';

        const data = {
            "username": user.username,
            "password": user.password
        };

        return this.http.post(url, data, {headers: this.httpOptions.headers, responseType: 'json'});
    }

    logout(auth) {
        const url = this.baseUrl + 'logout';
        if (auth != null) this.token = auth;
        const header = {
            auth: new HttpHeaders({
                "X-Auth-Token": this.token
            })
        };

        return this.http.post(url, null, {headers: header.auth, responseType: 'json'}).subscribe(
            resp => {
                localStorage.removeItem('token');
                this.router(['/']);
            },
            err => {
                console.log(err);
            }
        )
    }

    hasPermission = value => localStorage.getItem('roles').includes(value);
}