import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { LoadingService } from '../../services/loading-service/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method === 'GET') {
      return this.loadingService.startLoader().pipe(
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
