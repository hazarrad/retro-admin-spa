import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }


  public findAllOrder(): Observable<Orders[]> {
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user' + ':' + 'c06a32fd-eb55-4a33-b723-4518e788c705') });
    return this.httpClient.get<Orders[]>("http://localhost:8080/findAllOrders");
  }
  public createOrder(order: Orders) {
    return this.httpClient.post<Orders>("http://localhost:8080/order", order);
  }

  public updateOrder(order: Orders) {
    return this.httpClient.put<Orders>("http://localhost:8080/order/" + order.orderid, order);
  }

  public deleteOrder(order: Orders) {
    return this.httpClient.delete("http://localhost:8080/order/" + order.orderid, { responseType: 'text' });
  }






}
