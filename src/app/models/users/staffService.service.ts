import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from '../login/staff.model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private httpClient: HttpClient) { }

  public findAllStaff(): Observable<Staff[]> {
    return this.httpClient.get<Staff[]>("http://localhost:8080/findAllStaff");
  }
  public createStaff(staff: Staff) {
    return this.httpClient.post<Staff>("http://localhost:8080/staff", staff);
  }

  public updateStaff(staff: Staff) {
    return this.httpClient.put<Staff>("http://localhost:8080/staff/" + staff.id, staff);
  }

  public deleteStaff(staff: Staff) {
    return this.httpClient.delete("http://localhost:8080/staff/" + staff.id, { responseType: 'text' });
  }

}
