import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  constructor(
    private apiService: ApiService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(event => {
        this.apiService.loader.next(true);
        if(event.type == HttpEventType.Response){
          if(event.status == 200){
            this.apiService.loader.next(false);
          }
        }
      })
    );
  }
}
