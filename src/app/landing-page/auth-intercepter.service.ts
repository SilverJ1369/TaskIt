import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable, exhaustMap, switchMap, take, tap } from "rxjs";


@Injectable()

export class AutherInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('intercepting', req);

      return this.authService.currentUser.pipe(
        take(1),
        tap(user => {
          console.log('tap user', user);

        }),
        switchMap(user => {
          if (!user) {
            console.log('no user', user, new Date());
            return next.handle(req);
          }

          const modifiedReq = req.clone({
            params: new HttpParams().set("auth", user.token)

          });
          console.log('modifying request', new Date());

          return next.handle(modifiedReq);
        })
      )
  }

}
