import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {OauthService} from '../api/api/oauth.service';
import {UserService} from '../api';

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
        private oauthService: OauthService,
        private userService: UserService) { }

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
                    localStorage.setItem("currentUser", JSON.stringify({ token: data.access_token, user: this.model.username }));
                    this.userService.getCredendials(this.model.username).subscribe(
                      data2 => {
                        localStorage.setItem("currentUser", JSON.stringify({ token: data.access_token, user: data2 }));
                        this.router.navigate([this.returnUrl]);
                      }
                    )
                },
                error => {
                    this.loading = false;
                    this.attempt = false;
                });
    }
}
