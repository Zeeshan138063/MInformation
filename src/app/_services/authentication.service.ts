import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../config';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

login(username: string, password: string) {
        console.log(username, password);
  const headers = new Headers();
      headers.append('Content-Type', 'application/json');
        return this.http.post(Config.api + '/brand_auth/',
          JSON.stringify({ username: username, password: password }), {headers: headers})
            .map((response: Response) => {
                console.log('login response  ', response)
                // login successful if there's a jwt token in the response
                let user = response.json();
                //   response.json().token;
                if (user && user.token) {
                    if(user['profile_image'])
                    {
                        user['profile_image'] = Config.api + '/media/' + response.json()['profile_image']}
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
