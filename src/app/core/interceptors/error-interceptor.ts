import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toaster: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.status) {
          switch (error.status) {
            case 400:
              this.toaster.error('Bad request');
              break;
            case 401:
              this.toaster.error('Unauthorized');
              break;
            case 404:
              this.toaster.error('Not found');
              break;
            case 500:
              this.toaster.error('Server error');
              break;
            default:
              this.toaster.error('Unexpected error');
          }
        }
        return throwError(() => error);
      })
    );
  }
}
