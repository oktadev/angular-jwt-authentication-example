import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

export function onAuthRequired({ oktaAuth, router }) {
  router.navigate(['/login']);
}

const routes: Routes = [
  { path: '', component: ProfileComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired }  },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired }  },
  { path: 'implicit/callback', component: OktaCallbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
