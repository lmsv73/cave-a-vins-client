import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { UserService } from '../api';
import {OauthService} from '../api/api/oauth.service';

@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;
  username;
  password;
  confirmpassword;
  returnUrl: string;
  attempt = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private oauthService: OauthService) { }

  ngOnInit() {
    // reset login status
    //this.userService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  register() {
    if(this.password == this.confirmpassword) {
      this.loading = true;
      this.oauthService.getToken(this.model.username, this.model.password, "password")
        .subscribe(
          data => {
            this.oauthService.isLogged = true;
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.attempt = false;
            this.loading = false;
          });
    }
  }
}
