import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../../auth/services/authentication.service';
import {IRole} from '../../users/models/irole.interface';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          // check if route is restricted by role
          if (route.data.roles) {
            const userHasRole = currentUser.roles
              .find((role: IRole) => route.data.roles.includes(role.name));
            // If user doesn't have role needed for this route navigate back to home page
            if (userHasRole == null) {
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
