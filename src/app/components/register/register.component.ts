import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { UserService } from '../../api/index';

@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html'
})

export class RegisterComponent   {
  loading = false;
  username;
  password;
  confirmpassword;
  attempt = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) { }


  register() {
    this.attempt = true;
    if(this.password == this.confirmpassword) {
      this.loading = true;
      this.userService.createUser(this.username, this.password)
        .subscribe(
          data => {
            this.router.navigate(['/login']);
          }, error => {
            this.attempt = false;
            this.loading = false;
          });
    }
  }
}
