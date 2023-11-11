import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {


  signupForm: FormGroup;
  loginForm: FormGroup;
  errMsg: string = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

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
        console.log('Auth response Success: ', res);
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
    const {fName, lName, email, password} = form.value;

    this.authService.signIn(email, password).subscribe(
      (res) => {
        console.log('Auth response Success: ', res);
      },
      (err) => {
        console.error('Auth Res Error:', err);
        this.errMsg = err.message;
      }
    )
  }

}
