import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { User } from "./user.model";


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
  constructor(private http: HttpClient) {}

  currentUser = new BehaviorSubject<User>(null);
  userToken: string = null;

  signUp(email: string, password: string) {
    console.log(SIGN_UP_URL, email, password, AUTH_API_KEY);
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
    console.log('handle auth user: ', formUser, new Date());

    localStorage.setItem("userDate", JSON.stringify(formUser));
  }
}
