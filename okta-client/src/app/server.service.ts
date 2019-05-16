import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { Subject } from 'rxjs';

const baseUrl = 'http://localhost:10101';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(public oktaAuth: OktaAuthService, private http: HttpClient) {
  }

  request(method: string, route: string, data?: any) {
    if (method === 'GET') {
      return this.get(route, data);
    }

    const subject = new Subject<any>();

    this.oktaAuth.getAccessToken().then((token) => {
      const header = (token) ? {Authorization: `Bearer ${token}`} : undefined;

      const request = this.http.request(method, baseUrl + route, {
        body: data,
        responseType: 'json',
        observe: 'body',
        headers: header
      });

      request.subscribe(subject);
    });

    return subject;
  }

  get(route: string, data?: any) {
    const subject = new Subject<any>();

    this.oktaAuth.getAccessToken().then((token) => {
      const header = (token) ? {Authorization: `Bearer ${token}`} : undefined;

      let params = new HttpParams();
      if (data !== undefined) {
        Object.getOwnPropertyNames(data).forEach(key => {
          params = params.set(key, data[key]);
        });
      }

      const request = this.http.get(baseUrl + route, {
        responseType: 'json',
        headers: header,
        params
      });

      request.subscribe(subject);
    });

    return subject;
  }
}
