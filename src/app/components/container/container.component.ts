import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Staff } from 'src/app/models/login/staff.model';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  staff: Staff;
  path :string =this.router.url;
 constructor(private router: Router) { }


 ngOnInit() {
   this.path='';

   console.log("path red "+this.path)
   this.staff = JSON.parse(sessionStorage.getItem('connectedStaff'));
 }

 // This function exists in order to test for login page
 // in order to avoid rendering heade/menu on browser

 displayMenu() {
   return this.router.url !== '/login';
 }

}
