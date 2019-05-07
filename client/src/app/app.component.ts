import { Component, DoCheck } from '@angular/core';
import { Authentic } from "./authentic";
import { Router } from "@angular/router";
import { AuthService } from "./signin/auth.service";

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent extends Authentic implements DoCheck {

    isLogged = false;
    currentRoute;
    currentUser;

    constructor(private route: Router, private auth: AuthService) {
        super();
        this.currentUser = localStorage;
    }

    ngDoCheck(): void {
        this.isLogged = localStorage.getItem('token') != null;
        this.currentRoute = this.route.url;
    }

    checkPermission: (permission: string) => boolean;

    logout() {
        this.auth.logout(localStorage.getItem('token'));
    }
}
