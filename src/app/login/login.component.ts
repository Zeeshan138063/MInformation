import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Config } from '../config';
import { AlertService, AuthenticationService } from '../_services/index';
import {Http, Response} from '@angular/http';
import  {UserService} from  '../_services/user.service'

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',
    styleUrls: ['login.scss']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    influencers;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private http: Http, private usersvc: UserService, ) { }

    ngOnInit() {
        // reset login status
            this.authenticationService.logout();

            // get return url from route parameters or default to '/'
            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }
    private getuser() {
        let cu = JSON.parse(localStorage.getItem('currentUser'));
        this.usersvc.getByUsername(cu.username).subscribe(name => {
            // alert(name.first_name);

            cu.first_name = name.first_name;
            localStorage.setItem('currentUser', JSON.stringify(cu));
            console.log(cu);

        });
    }
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {

                    // this.getuser();
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error('Invalid username or password.');
                    this.loading = false;
                });
    }
    doThis() {

        window.location.href = Config.api + '/tweeter_login/';
    }
       doThisFB() {

        window.location.href = Config.api + '/oauth/login/facebook/';
    }
}
