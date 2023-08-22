import { Products } from "../products/products.model";


export class Colis {
  id: number;
  trackingNumber: string;
  productsAttached: Products[];
  paymentTotal: number;
  chargeImportation: number;
  status: string;
  quantity: number;
  details: string;



}


