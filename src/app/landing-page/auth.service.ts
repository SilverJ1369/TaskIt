import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";


const AUTH_API_KEY = "AIzaSyD8vJlpFMh7dLpgP287escs0qqAnFi_PI4";
const SIGN_UP_URL =
`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`;
const SIGN_IN_URL =
`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`;

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root"
})

export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  userToken: string = null;

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(SIGN_UP_URL + AUTH_API_KEY, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      tap(res => {
        const { email, localId, idToken, expiresIn } = res;
        this.handleAuth(email, localId, idToken, +expiresIn)
      })
    )
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
        SIGN_IN_URL + AUTH_API_KEY,
        {
        email,
        password,
        returnSecureToken: true,
        })
        .pipe(
          tap(res => {
            const { email, localId, idToken, expiresIn } = res;
            this.handleAuth(email, localId, idToken, +expiresIn)
          })
        )
  }

  handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    const formUser = new User(email, userId, token, expDate);
    this.currentUser.next(formUser);
    localStorage.setItem("userData", JSON.stringify(formUser));
  }

  logout() {
    this.currentUser.next(null);
    localStorage.removeItem("userData");
    this.router.navigate(["/landing-page"]);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    } else {
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
      if (loadedUser.token) {
        if (new Date(userData._tokenExpirationDate) < new Date()) {
          this.currentUser.next(null);
          localStorage.removeItem("userData");
          this.router.navigate(["/landing-page"]);
        } else {
          this.currentUser.next(loadedUser);
          this.router.navigate(["/tasklist"]);
        }

      }
    }
  }
}
