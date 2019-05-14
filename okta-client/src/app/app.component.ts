import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'okta-client';
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(public oktaAuth: OktaAuthService) {
    this.oktaAuth.$authenticationState.subscribe(this.isLoggedIn);
  }

  ngOnInit() {
    this.oktaAuth.isAuthenticated().then((auth) => {this.isLoggedIn.next(auth)});
  }

  onLogout() {
    this.oktaAuth.logout('/');
  }
}
