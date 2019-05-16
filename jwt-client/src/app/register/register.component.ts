import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private server: ServerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.email],
      name: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    },);
  }

  onSubmit() {
    console.log('Submitting');
    if (!this.form.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    console.log('Form valid');
    const request = this.server.request('POST', '/register', {
      email: this.form.get('email').value,
      name: this.form.get('name').value,
      password: this.form.get('password').value
    });

    request.subscribe(() => {
      this.router.navigate(['/login']);
    })
  }
}
