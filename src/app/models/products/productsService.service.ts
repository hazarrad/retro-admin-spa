import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from './products.model';
import { an } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }


  public findAllProducts(): Observable<Products[]> {
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user' + ':' + 'c06a32fd-eb55-4a33-b723-4518e788c705') });
    return this.httpClient.get<Products[]>("http://localhost:8080/findAllProducts");
  }
  public createProduct(product: Products, coliId: any) {
    return this.httpClient.post<Products>("http://localhost:8080/coli/" + coliId + "/product", product);
  }

  public updateProduct(product: Products) {

    console.log("updaaaaaaaated " + JSON.stringify(product))
    return this.httpClient.put<Products>("http://localhost:8080/product/" + product.id, product);
  }

  public deleteProduct(product: Products) {
    return this.httpClient.delete("http://localhost:8080/product/" + product.id, { responseType: 'text' });
  }



  public assignProductToColi(coliId: number, product: Products) {

    return this.httpClient.post<Products>("http://localhost:8080/coli/" + coliId + "/product", product);
  }



}
