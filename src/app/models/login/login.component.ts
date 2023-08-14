import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { LoginService } from './login.service';
import { Role, Staff } from './staff.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  mail: string;
  password: string;
  public staff: Staff;
  redirectUrl: string;
  isLoggedIn = false;
  constructor(private loginservice: LoginService, private router: Router) { }

  ngOnInit() {
    console.log("heeeeeeeer")
    if (sessionStorage.getItem('isLoggedIn')) {
      this.router.navigate(['']);
    }
  }

  login() {
    this.loginservice.login(this.mail, this.password)
      // .pipe(catchError(this.errorHandler))
      .subscribe((staffData) => {
        console.log(this.mail);
        console.log(this.password);
        sessionStorage.clear();
        console.log(staffData);
        if (staffData !== null && staffData.password === this.password) {
          this.redirectUrl = this.getKeyByValue(`${staffData.role}`);
          console.log("redierct " + this.redirectUrl);
          this.isLoggedIn = true;
          sessionStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
          sessionStorage.setItem('connectedStaff', JSON.stringify(staffData));
          this.router.navigate(['']);
        } else {
          // this.showErrorMeesgaeWhenLoginWrong();
          this.isLoggedIn = false;
        }
      });
  }


  getKeyByValue(value: string) {
    const indexOfS = Object.values(Role).indexOf(value as unknown as Role);

    const key = Object.keys(Role)[indexOfS];

    return key;
  }

  errorHandler(error: HttpErrorResponse) {

    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.error.message + " " + error.status,
      position: 'top',
      showConfirmButton: false,
      timer: 25000
    })

  }
}
