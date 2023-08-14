import { Component, OnInit, Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../models/login/login.service';

@Injectable({
    providedIn: 'root'
})
export class ConfirmerGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) { }

    // Test applied to authenticate Admin
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const url: string = state.url;
      console.log(url)
  
      return this.checkLogin(url);
    }
  
    // checks wether there is a logged in user
    // and wether that user is an admin
    checkLogin(url: string): boolean {
      if (
        sessionStorage.getItem('isLoggedIn')
      ) {
        return true;
      }
  
      // Store the attempted URL for redirecting
      this.loginService.redirectUrl = url;
  
      // Navigate to the login page
      this.router.navigate(['login']);
      return false;
    }

}
