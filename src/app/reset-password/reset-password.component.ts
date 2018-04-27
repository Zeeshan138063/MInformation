import { Component, OnInit } from '@angular/core';
import {Config} from "../config";
import {HttpService} from "../services/http-service";
import swal from 'sweetalert2';
import {Headers, Response, Http} from '@angular/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'

})
export class ResetPasswordComponent implements OnInit {
  email_phone;
  constructor(private http: HttpService) { }

  ngOnInit() {
  }
    reset_password(){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(Config.api + '/reset_password/', JSON.stringify({
                username_or_email: this.email_phone
            }),
            {headers: headers}).map((response: Response) => response.json()).subscribe(
            data => {

                swal(
                    'Reset password email sent',
                    '',
                    'success'
                )
            },
            error => {

                swal(
                    'Wrong email/username',
                    '',
                    'error'
                )
            });
    }

}
