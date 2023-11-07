import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  signupForm: FormGroup;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {}

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

  }

  login() {

  }

}
