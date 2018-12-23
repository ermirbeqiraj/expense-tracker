import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageManager } from './local-storage.service';
import { Router } from '@angular/router';
import { DbContextService } from '../storage/db-context.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public storageManager: LocalStorageManager) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.storageManager.GetToken()}`
      }
    });
    return next.handle(request);
  }
}

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(public storageManager: LocalStorageManager, public route: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // cleanup token, hide the menu, redirect to login
            this.storageManager.ClearAuth();
            this.route.navigate(['./login']);
          }
        }
      }));
  }
}


@Injectable()
export class ErrResponseInterceptor implements HttpInterceptor {
  constructor(public dbStore: DbContextService, public toasts: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(`Error: ${err.status} is detected.`);
          const req = request.clone();
          if (err.status === 0 && (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE')) {
            this.dbStore.saveRequest(req.urlWithParams, req.method, req.body);
            this.toasts.info('Network connection is not available. This operation will be retried when network is available.');
            return new Observable(() => { });
          }
        }
      }));
  }
}
