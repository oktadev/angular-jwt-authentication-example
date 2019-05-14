import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string;
  email: string;
  name: string;

  constructor(private server: ServerService, oktaAuth: OktaAuthService) { 
    oktaAuth.getUser().then(user => {
      this.name = user.name;
    })
  }

  ngOnInit() {
    this.server.request('GET', '/profile').subscribe((user: any) => {
      if (user) {
        this.id = user.id;
        this.email = user.email;
      }
    });
  }
}
