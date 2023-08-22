import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Customer, Representative } from '../home/customer';
import { CustomerService } from '../home/customerservice.service';
import { Role, Staff } from '../login/staff.model';
import { StaffService } from './staffService.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UsersComponent implements OnInit {


  staffList!: Staff[];
  totalRecords!: number;
  metaKeySelection: boolean = true;
  staff!: Staff;
  createStaffDialog: boolean = false;
  isNew: boolean = false;
  staffFromGroup: FormGroup;
  keys = Object.keys;
  roles = Role;

  constructor(private formBuilder: FormBuilder, private staffService: StaffService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.staffService.findAllStaff().subscribe((res) => {
      this.staffList = res['content'];
      this.totalRecords = res['totalElements'];
    });

    this.staffFromGroup = this.formBuilder.group({
      'id': [''],
      'firstName': [''],
      'lastName': [''],
      'cinCard': [''],
      'phoneNumber': [''],
      'city': [''],
      'mail': [''],
      'role': [''],
      'password': [''],
    });

  }

  clear(table: Table) {
    table.clear();
  }


  deleteStaff(staff: Staff) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + staff.mail + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.staffService.deleteStaff(staff).subscribe((res) => {
          this.staffList = this.staffList.filter((val) => val.id !== staff.id);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Staff Deleted', life: 3000 });
        });
      }
    });
  }

  addStaff(staff: Staff) {
    this.staff = staff;
    this.staffService.createStaff(this.staff).subscribe(data => {
      this.staffList.unshift(data);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Staff Created', life: 3000 });
      this.createStaffDialog = false;
    });
  }


  updateStaff(staff: Staff) {
    this.staff = staff;
    this.staffService.updateStaff(this.staff).subscribe(data => {
      let indexToUpdate = this.staffList.findIndex(item => item.id === data.id);
      this.staffList[indexToUpdate] = data;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Staff Updated', life: 3000 });
      this.createStaffDialog = false;
    });
  }
  

  openCreateModule(staff?: Staff) {
    this.staffFromGroup.reset();
    this.isNew = staff == null;

    if (staff != undefined) {
      this.staffFromGroup.setValue(staff)
    }
    this.staff = { ...staff };
    this.createStaffDialog = true;
  }



  hideDialog() {
    this.createStaffDialog = false;
  }
}



