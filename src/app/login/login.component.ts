import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {OauthService} from '../api/api/oauth.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})


export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    attempt: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private oauthService: OauthService) { }

    ngOnInit() {
        // reset login status
        //this.userService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.oauthService.getToken(this.model.username, this.model.password, "password")
            .subscribe(
                data => {
                    this.oauthService.isLogged = true;
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.loading = false;
                    this.attempt = false;
                });
    }
}
