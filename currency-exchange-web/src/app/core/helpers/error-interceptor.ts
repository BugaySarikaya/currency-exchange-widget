import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  public handleError(errorRes: HttpErrorResponse) {
    let errorMessage = errorRes.error.message || 'An Unknown error occurred!';

    switch (errorRes.error.statusCode) {
      case 400:
        errorMessage = 'Bad Request';
        break;
      case 401:
        errorMessage = 'Unauthorized';
        break;
      case 402:
        errorMessage = 'Payment Required';
        break;
      case 403:
        errorMessage = 'Forbidden';
        break;
      case 404:
        errorMessage = 'Not Found';
        break;
      case 405:
        errorMessage = 'Method Not Allowed';
        break;
      case 406:
        errorMessage = 'Not Acceptable';
        break;
      case 408:
        errorMessage = 'Request Timeout';
        break;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Operation Failed',
      detail: errorMessage,
    });

    return throwError(errorMessage);
  }
}
