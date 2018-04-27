import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Config } from '../config';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(Config.api+'/users/', this.jwt()).map((response: Response) => response.json());
    }

    getByUsername(id: string) {
        return this.http.get(Config.api+'/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    getUserTweets(username: string) {
        return this.http.get(Config.api+'/gettweets/' + username+'/', this.jwt()).map((response: Response) => response.json());
    }
    create(user: User) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let headers = new Headers();
      if (currentUser && currentUser.token) {
        headers = new Headers({ 'Authorization': 'JWT ' + currentUser.token });
      }

      headers.append('Content-Type', 'application/json');

      return this.http.post(Config.api+'/users/', JSON.stringify(user),
        {headers: headers}).map((response: Response) => response.json());
    }

  update(user: User) {
    return this.http.put(Config.api+'/users/'
      + user.id, user, this.jwt()).map((response: Response) => response.json());
  }

    delete(id: number) {
        return this.http.delete(Config.api+'/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({ 'Authorization': 'JWT ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
