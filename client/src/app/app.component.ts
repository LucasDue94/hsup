import { Component, DoCheck } from '@angular/core';
import { Authentic } from "./authentic";

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent extends Authentic implements DoCheck {

    isLogged = false;

    constructor() {
        super();
    }

    ngDoCheck(): void {
        this.isLogged = localStorage.getItem('token') != null;
    }

    checkPermission: (permission: string) => boolean;
}
