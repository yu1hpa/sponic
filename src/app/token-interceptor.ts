import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  accessToken = 'BQCPb-ZP2jmLPcpFbifLX5vu3-9AN_BTAmINoVMGO2utKCsI4DJ-Vk4ElwqKD1dmf9Srp0oCRSKQnW359n0';
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = req.headers.append('Authorization', `Bearer ${this.accessToken}`);
    const newRequest = req.clone({ headers });

    return next.handle(newRequest);
  }
}
