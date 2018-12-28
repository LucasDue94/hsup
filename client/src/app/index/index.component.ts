import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav/nav.service';
import { Route, Router } from '@angular/router';
import { AuthService } from "../signin/auth.service";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',

    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    controllers: Array<any>;

    constructor(private navService: NavService, private router: Router, private authService: AuthService) {
    }

    ngOnInit(): void {
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

    logout() {
        this.authService.logout(sessionStorage.getItem('token'));
    }
}
