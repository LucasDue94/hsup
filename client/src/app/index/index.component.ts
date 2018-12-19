import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav/nav.service';
import { Route, Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    controllers: Array<any>;
    serverUrl: string;

    items = [
        {desc: 'Teclado para desktop windows', qnt: 10, stock: 0},
        {desc: 'Mouse', qnt: 3, stock: 4},
        {desc: 'Notebook', qnt: 54, stock: 8},
        {desc: 'Café', qnt: 3, stock: 69},
        {desc: 'Bolacha', qnt: 2,stock: 10},
        {desc: 'Água', qnt: 12,stock: 4},
        {desc: 'Playstation 4', qnt: 1,stock: 4},
        {desc: 'Liquidificador', qnt: 2,stock: 39},
        {desc: 'Água', qnt: 12,stock: 4},
        {desc: 'Playstation 4', qnt: 1,stock: 10},
        {desc: 'Liquidificador', qnt: 2,stock: 4},
        {desc: 'Água', qnt: 12,stock: 4},
        {desc: 'Playstation 4', qnt: 1,stock: 0},
        {desc: 'Liquidificador', qnt: 2,stock: 0},
    ];

    constructor(private navService: NavService, private router: Router) {
    }

    ngOnInit(): void {
        this.serverUrl = environment.serverUrl;
        this.navService.getNavData().subscribe(applicationData => {
            this.controllers = applicationData.controllers.sort((a: any, b: any) => {
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                } else {
                    return 0;
                }
            });
        });
    }

    hasRoute(controllerName: string): boolean {
        return this.router.config.some((route: Route) => {
            if (route.path === controllerName) {
                return true;
            }
        });
    }
}
