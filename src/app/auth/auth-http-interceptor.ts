import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {filter, Observable, tap} from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      withCredentials: true
    })
    return next.handle(modifiedReq)
      .pipe(
        //filter is basically replacing an if statement
        filter(value => value.type === HttpEventType.Sent),
        tap(value => {
          console.log('request was sent to server')
        })
      );
  }
}
