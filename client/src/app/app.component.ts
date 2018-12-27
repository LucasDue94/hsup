import { Component, OnInit } from '@angular/core';
import { AuthService } from "./signin/auth.service";

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    isLogged;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        if (localStorage.getItem('token') != null) this.isLogged = localStorage.getItem('token');
    }
}
