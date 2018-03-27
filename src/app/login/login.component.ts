import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../_services/index';
import {OauthService} from '../api/api/oauth.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})


export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private oathService: OauthService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        //this.userService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.oathService.getToken(this.model.username, this.model.password, "password")
            .subscribe(
                data => {
                    this.oathService.isLogged = true;
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
