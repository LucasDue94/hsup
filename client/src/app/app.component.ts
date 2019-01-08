import { Component, DoCheck } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent implements DoCheck {

    isLogged = false;

    constructor() {
    }

    ngDoCheck(): void {
        this.isLogged = localStorage.getItem('token') != null;
    }
}
