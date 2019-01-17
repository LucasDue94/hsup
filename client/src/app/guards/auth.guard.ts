import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../signin/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (localStorage.getItem('token') == null) {
            this.router.navigate(['/']);
            return false;
        }

        if (route.firstChild && !this.authService.hasPermission(route.firstChild.data.permissao)) {
            this.router.navigate(['/erro']);
            return false;
        }

        return true;
    }
}