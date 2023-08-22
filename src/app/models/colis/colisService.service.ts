import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colis } from './colis.model';
import { Products } from '../products/products.model';

@Injectable({
  providedIn: 'root'
})
export class ColisService {

  constructor(private httpClient: HttpClient) { }


  public findAllColis(): Observable<Colis[]> {
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user' + ':' + 'c06a32fd-eb55-4a33-b723-4518e788c705') });
    return this.httpClient.get<Colis[]>("http://localhost:8080/findAllColis");
  }
  public createColis(colis: Colis) {
    return this.httpClient.post<Colis>("http://localhost:8080/coli", colis);
  }

  public updateColis(colis: Colis) {
    return this.httpClient.put<Colis>("http://localhost:8080/coli/" + colis.id, colis);
  }

  public deleteColis(coliId: any) {
    return this.httpClient.delete("http://localhost:8080/coli/" + coliId, { responseType: 'text' });
  }



  public getAllAssignedProducts(coliId: any): Observable<Products[]> {
    return this.httpClient.get<Products[]>("http://localhost:8080/colis/" + coliId + "/products");
  }



  public deleteProductFromColi(coliId: any, productId: any) {
    return this.httpClient.delete("http://localhost:8080/coli/" + coliId + "/product/" + productId, { responseType: 'text' });
  }

}
