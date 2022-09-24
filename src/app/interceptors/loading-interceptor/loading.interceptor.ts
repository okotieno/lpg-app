import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from '../../services/loading-service/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request.method);
    if (request.method === 'GET') {
      this.loadingService.startLoader();
      return next.handle(request).pipe(
        catchError((err) => {
          this.loadingService.stopLoader();
          return throwError(err);
        }),
        finalize(() => this.loadingService.stopLoader()),
      );
    } else {
      return next.handle(request);
    }

  }
}
