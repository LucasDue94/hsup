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
        {descricao: 'Teclado para desktop windows', qnt: 10, stock: 0},
        {descricao: 'Mouse', qnt: 3, stock: 4},
        {descricao: 'Notebook', qnt: 54, stock: 8},
        {descricao: 'Café', qnt: 3, stock: 69},
        {descricao: 'Bolacha', qnt: 2,stock: 10},
        {descricao: 'Água', qnt: 12,stock: 4},
        {descricao: 'Playstation 4', qnt: 1,stock: 4},
        {descricao: 'Liquidificador', qnt: 2,stock: 39},
        {descricao: 'Água', qnt: 12,stock: 4},
        {descricao: 'Playstation 4', qnt: 1,stock: 10},
        {descricao: 'Liquidificador', qnt: 2,stock: 4},
        {descricao: 'Água', qnt: 12,stock: 4},
        {descricao: 'Playstation 4', qnt: 1,stock: 0},
        {descricao: 'Liquidificador', qnt: 2,stock: 0},
    ];

    products = [
        {descricao: 'Mouse TIPO B', qnt: 3, stock: 4},
        {descricao: 'Mouse TIPO A', qnt: 3, stock: 4},
        {descricao: 'MousePad', qnt: 3, stock: 4},
        {descricao: 'Mouse Sem Fio', qnt: 3, stock: 4},
        {descricao: 'Notebook', qnt: 54, stock: 8},
        {descricao: 'Playstation 4', qnt: 1,stock: 0},
        {descricao: 'Playstation 3', qnt: 1,stock: 0},
        {descricao: 'Playstation 2', qnt: 1,stock: 0},
        {descricao: 'Playstation 1', qnt: 1,stock: 0},
        {descricao: 'Liquidificador', qnt: 2,stock: 0},
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
