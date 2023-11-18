import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../landing-page/auth.service";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authService.currentUser.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;

        if (isAuth) return true;
        if (!isAuth) return this.router.createUrlTree(["landing-page"]);
      })
    );
  }
}
