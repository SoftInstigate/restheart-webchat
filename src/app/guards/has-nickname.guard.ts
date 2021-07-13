import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../services/user.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HasNicknameGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.userService.currentUser$.pipe(
        map(hasUsername => {
          console.log(`hasUsername? ${hasUsername}`);
          if (hasUsername) {
            return true;
          } else {
            this.router.navigate(['pick-nickname'], { queryParams: { redirectTo: state.url } });
            return false;
          }
        })
      );

  }

}
