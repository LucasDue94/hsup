import { Component, DoCheck, OnChanges } from '@angular/core';
import { Authentic } from "./authentic";
import { Router } from "@angular/router";

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent extends Authentic implements DoCheck {

    isLogged = false;
    currentRoute;

    constructor(private route: Router) {
        super();
    }

    ngDoCheck(): void {
        this.isLogged = localStorage.getItem('token') != null;
        this.currentRoute = this.route.url;
    }

    checkPermission: (permission: string) => boolean;
}
