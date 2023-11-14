import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  signupForm: FormGroup;
  loginForm: FormGroup;
  errMsg: string = null;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {}

  signupBool: boolean = false;
  loginBool: boolean = false;
  hasLanded: boolean = true;

  onSignup() {
    this.signupBool = true;
    this.hasLanded = false;
    this.loginBool = false;
  }

  onLogin() {
    this.loginBool = true;
    this.hasLanded = false;
    this.signupBool = false;
  }

  signup(form: NgForm) {
    if (!form.valid) return;
    const {fName, lName, email, password} = form.value;

    this.authService.signUp(email, password).subscribe(
      (res) => {
        if (this.errMsg) this.errMsg = null;
        console.log('Auth response Success: ', res);

        this.router.navigate(['tasklist'])
      },
      (err) => {
        console.error('Auth Res Error:', err);
        this.errMsg = err.message;
      }
    )
    form.reset();
  }

  login(form: NgForm) {
    if (!form.valid) return;
    console.log('logging in', new Date());

    const {fName, lName, email, password} = form.value;

    this.authService.signIn(email, password).subscribe({
      next: (res) => {
        if (this.errMsg) this.errMsg = null;
        console.log('Auth response Success: ', res);

        this.router.navigate(['tasklist']);
      },
      error: (err) => {
        console.error('Auth Res Error:', err);
        this.errMsg = err.message;
      }
    })


    // .subscribe(
    //   (res) => {
    //     if (this.errMsg) this.errMsg = null;
    //     console.log('Auth response Success: ', res);

    //     // this.router.navigate(['tasklist']);
    //   },
    //   (err) => {
    //     console.error('Auth Res Error:', err);
    //     this.errMsg = err.message;
    //   }
    // )
  }

}
