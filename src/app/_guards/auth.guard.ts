import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {OauthService} from '../api/api/oauth.service';
import {UserService} from '../api';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService : OauthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(this.authService.isLogged) return true;

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}