import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

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

}
