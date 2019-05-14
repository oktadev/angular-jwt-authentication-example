import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name: string;
  email: string;

  constructor(private server: ServerService) { }

  ngOnInit() {
    this.server.request('GET', '/profile').subscribe((user: any) => {
      if (user) {
        this.name = user.name;
        this.email = user.email;
      }
    });
  }
}
