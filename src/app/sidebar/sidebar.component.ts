import { Component, OnInit } from '@angular/core';
import { AuthService } from '../landing-page/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  email: string;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    //get user data from local storage and store parsed data in user variable
    const user = JSON.parse(localStorage.getItem('userData'));
    this.email = user.email;
  }
  onLogout() {
    this.authService.logout();
  }

}
