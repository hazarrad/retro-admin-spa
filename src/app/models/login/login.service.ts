import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Staff } from './staff.model';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn = false;
  redirectUrl: string;

  constructor(private router: Router, private httpClient: HttpClient) { }

  login(mail: string, password: string) {
    // const headers= new HttpHeaders({Authorization :'Basic'+btoa(mail+":"+password)});
    const params = new HttpParams().set('mail', mail).set('password', password);
    return this.httpClient.get<Staff>("http://localhost:8080/login", { params }).pipe(
      map(
        userData => {
          sessionStorage.setItem('mail', mail);
          sessionStorage.setItem('password', password);
          return userData;
        }
      )
     

    );
  }

  logout(): void {
    this.isLoggedIn = false;
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  
}
