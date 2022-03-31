import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor, HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  accessToken = 'BQBvOAtJrUBsiK4wZghoYfwFj6z210JhrP4UbFTNH-jldgPa0WouQ9QqBzAGHtTvyvrhKsBjBiuuquDoLLc';
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = req.headers.append('Authorization', `Bearer ${this.accessToken}`);
    const newRequest = req.clone({ headers });

    return next.handle(newRequest);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];
