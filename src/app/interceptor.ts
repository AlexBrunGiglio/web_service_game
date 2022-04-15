import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    constructor(
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
        let authReq = req;
        const token = localStorage.getItem('token');
        if (token != null) {
            authReq = this.addTokenHeader(req, token);
        }
        return next.handle(authReq);
    }
    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone(
            {
                setHeaders: {
                    'x-auth-token': token,
                }
            }
        );
    }
}