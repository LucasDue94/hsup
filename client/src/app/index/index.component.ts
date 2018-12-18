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
        {desc: 'teclado', qnt: '10'},
        {desc: 'mouse', qnt: '3'},
        {desc: 'notebook', qnt: '54'},
        {desc: 'memória', qnt: '36'}
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
