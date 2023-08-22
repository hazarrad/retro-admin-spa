import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService, SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Products } from '../products/products.model';
import { ProductsService } from '../products/productsService.service';
import { Customer, Representative } from './customer';
import { CustomerService } from './customerservice.service';
import { Cities, Orders, Status } from './order.model';
import { OrderService } from './orderService.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class HomeComponent implements OnInit {
  listOfOrders!: Orders[];
  productslist!: Products[];

  selectedProduct: any | undefined;

  totalRecords!: number;
  selectAll: boolean = false;
  metaKeySelection: boolean = true;
  orderFormGroup: FormGroup;
  lessonForm: FormGroup;
  isNew: boolean = false;
  order!: Orders;
  orderDialog: boolean = false;

  status: any = Object.keys(Status).map(key => ({ label: Status[key], value: key }));
  cities: any = Object.keys(Cities).map(key => ({ label: Cities[key], value: key }));

  selectedOrder:Orders;
  assignedProducts!: Products[];


  constructor(private formBuilder: FormBuilder, private orderService: OrderService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private productService: ProductsService) { }

  ngOnInit() {

    this.productService.findAllProducts().subscribe((res) => {
      this.productslist = res['content'];
    });

    this.orderService.findAllOrder().subscribe((data) => {
      this.listOfOrders = data['content']
      this.totalRecords = data['totalElements'];

    })
// 

    this.orderFormGroup = this.formBuilder.group({
      'orderid': [''],
      'clientName': [''],
      'clientNumber': [''],
      'city': [''],
      'clientAddress': [''],
      'creationDate': [''],
      'amount': [''],
      'status': [''],
      'shoppingCart': [''],
      'totalToPay': [''],


    });


    
    // this.lessonForm = this.formBuilder.group({
    //   'product': [''],

    // });
  }

  
  onRowSelect(event) {
    console.log('heeeeeeeeeeer' +JSON.stringify(this.selectedOrder.shoppingCart))
    this.assignedProducts=this.selectedOrder.shoppingCart;
}

   totalToPay() {
    let total = 0;
    for (let p of this.shoppingCart.value) {
      total += p.priceSell;
    }

    this.orderFormGroup.patchValue({
      totalToPay: total,
      amount: this.shoppingCart.value.length
    });
  }

  get shoppingCart() {
    return this.orderFormGroup.controls["shoppingCart"] as FormArray;
  }

  // addLesson() {

  //   var array:any = [{ "id": 90, "productName": "retro barsil", "quantity": 8, "priceSell": 0, "pricePerchase": 0, "mainPic": "https://i.ibb.co/Smh86mH/d326621a48c508bc330fc750f420258d.webp", "showPic": [null, null, null, null, null, null, null, null], "details": "", "leagues": "Serie A", "orders": [] }];

  //   this.shoppingCart.push(this.formBuilder.array(this.lessonForm.get('product').value));
  // }

  getSeverityStatus(status: string) {
    switch (status) {
      case 'Retour':
        return 'danger';

      case 'Done':
        return 'success';

      case 'Demand':
        return 'info';

      case 'Uncertain':
        return 'warning';

      case 'Delivery':
        return 'secondary';

      case 'Confirm':
        return 'secondary';
    }
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Serie A':
        return 'danger';

      case 'La Liga':
        return 'success';

      case 'Premier League':
        return 'primary';

      case 'Retro':
        return 'warning';

      case 'renewal':
        return null;
    }
  }

  createOrder(order: Orders) {
    this.totalToPay()
    // this.getTotal()
    // this.addLesson();
    console.log("selectedProduct " + JSON.stringify(this.orderFormGroup.get('shoppingCart').value))
    // console.log("orderFormGroup " + JSON.stringify(this.orderFormGroup.value))
    this.order = order;
    this.orderService.createOrder(this.orderFormGroup.value).subscribe(data => {
      this.listOfOrders.unshift(data);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Order Created', life: 3000 });
      this.orderDialog = false;
    });
  }


  deleteOrder(order: Orders) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + order.orderid + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.deleteOrder(order).subscribe((res) => {
          this.listOfOrders = this.listOfOrders.filter((val) => val.orderid !== order.orderid);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Order Deleted', life: 3000 });
        });
      }
    });
  }


  updateOrder() {
    this.totalToPay();
    this.order = this.orderFormGroup.value;

    console.log('htis order '+this.order)
    this.orderService.updateOrder(this.orderFormGroup.value).subscribe(data => {
      let indexToUpdate = this.listOfOrders.findIndex(item => item.orderid === data.orderid);
      this.listOfOrders[indexToUpdate] = data;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Staff Updated', life: 3000 });
      this.orderDialog = false;
    });
  }


  openModule(order?: Orders) {
    this.orderFormGroup.reset();
    this.isNew = order == null;

    if (order != undefined) {
      this.orderFormGroup.setValue(order)
    }
    this.order = { ...order };
    this.orderDialog = true;
  }

  hideDialog() {
    this.orderDialog = false;
  }

  clear(table: Table) {
    table.clear();
  }

}