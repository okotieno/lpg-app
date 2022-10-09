import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { LoadingService } from '../../services/loading-service/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method === 'GET') {
      return from(this.loadingService.startLoader(request.url)).pipe(
        switchMap(() => next.handle(request).pipe(
            finalize(() => {
              this.loadingService.stopLoader();
            }),
          )
        ));
    } else {
      return next.handle(request);
    }

  }
}
