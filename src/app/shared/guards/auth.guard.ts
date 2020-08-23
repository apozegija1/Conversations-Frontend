import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../../auth/services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          // check if route is restricted by role
          if (route.data.roles) {
            const userHasRole = route.data.roles.filter(element => currentUser.roles.includes(element));
            if (userHasRole) {
              // role not authorised so redirect to home page
              this.router.navigate(['/']);
              return false;
            }
          }

          // authorised so return true
          return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
