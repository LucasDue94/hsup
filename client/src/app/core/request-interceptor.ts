import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        },
    ],
})

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (!token) return next.handle(req);

        const request = req.clone({headers: req.headers.set('X-Auth-Token', token)});
        return next.handle(request);
    }
}