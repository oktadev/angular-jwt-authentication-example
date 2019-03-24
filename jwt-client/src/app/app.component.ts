import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'okta-jwt-client-blueprint';

  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
