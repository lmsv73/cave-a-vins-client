import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {OauthService} from '../api/api/oauth.service';

@Injectable()
export class SimpleUserGuard implements CanActivate {

  constructor(private router: Router, private authService : OauthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.authService.isSimpleUser()) return true;

    // not logged in so redirect to login page with the return url
    this.router.navigate(['admin']);
    return false;
  }
}
