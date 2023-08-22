import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Products } from '../products.model';
import { ProductsService } from '../productsService.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColisService } from '../../colis/colisService.service';
import { an } from '@fullcalendar/core/internal-common';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class ListProductComponent implements OnInit {

  productslist!: Products[];
  selectedProducts!: Products[];
  statuses!: any[];
  colisOptions!: any[];
  images: any[] | undefined;
  responsiveOptions: any[] | undefined;


  product!: Products;
  selectedColi: any | undefined;
  isNew: boolean = false;
  visible: boolean = false;
  productDialog: boolean = false;
  assignColiDialog: boolean = false;
  createProductDialog: boolean = false;
  assignColi
  submitted: boolean = false;
  productFromGroup: FormGroup;
  totalRecords!: number;
  metaKeySelection: boolean = true;

  constructor(private productService: ProductsService, private router: Router,
    private formBuilder: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService, private colisService: ColisService) { }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  ngOnInit(): void {
    this.productService.findAllProducts().subscribe((res) => {
      this.productslist = res['content'];
    });

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5
      },
      {
        breakpoint: '768px',
        numVisible: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ];

    this.statuses = [
      { label: 'Serie A', value: 'Serie A' },
      { label: 'La Liga', value: 'La Liga' },
      { label: 'Retro', value: 'Retro' },
      { label: 'Premier League', value: 'Premier League' }
    ];

    this.productFromGroup = this.formBuilder.group({
      'productName': [''],
      'quantity': [''],
      'priceSell': [''],
      'pricePerchase': [''],
      'mainPic': [''],
      'details': [''],
      'leagues': [''],
      'showPic': this.formBuilder.array([]),
      'selectedColi': [''],
    });
  }



  getProductStatus(quantity: number) {
    console.log(quantity)


    if (quantity === 0) {
      return 'danger';
    } else if (quantity >= 1 && quantity < 10) {
      return 'warning';
    } else if (quantity >= 10) {
      return 'primary';

    } else {
      return 'renewal';

    }

  }
  filterArray(arr) {
    return arr != null ? arr.filter((value) => value != null && value != '') : [];
  }

  clear(table: Table) {
    table.clear();
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

  redirect(): void {
    this.router.navigate(['Admin/createproduct']);
  }

  deleteProduct(product: Products) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.productName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(product).subscribe((res) => {
          this.productslist = this.productslist.filter((val) => val.id !== product.id);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        });
      }
    });
  }

  updateProduct(product: Products) {
    this.product = product;
    this.productService.updateProduct(this.product).subscribe(data => {
      this.product = data;
      let indexToUpdate = this.productslist.findIndex(item => item.id === data.id);
      this.productslist[indexToUpdate] = data;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      this.productDialog = false;
    });
  }


  assignProduct(product: Products) {
    this.product = product;
    this.productService.assignProductToColi(this.selectedColi.id, product)
      .subscribe((X) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Assigned', life: 3000 });
        this.assignColiDialog = false;
      });
  }

  assignDialog(product: Products) {
    this.colisService.findAllColis().subscribe((res) => {
      this.colisOptions = res['content'];
    });
    this.product = { ...product };
    this.assignColiDialog = true;
  }


  addProduct(product: Products) {
    this.product = product;
    this.productService.createProduct(this.product, this.productFromGroup.get('selectedColi').value).subscribe(data => {
      this.productslist.unshift(data);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      this.createProductDialog = false;
    });
  }

  editProduct(product: Products) {
    this.product = { ...product };
    this.productDialog = true;
  }

  openModule(product?: Products) {
    this.product = { ...product };
    this.productDialog = true;
    this.visible = true;
  }

  openCreateModule(product?: Products) {
    this.colisService.findAllColis().subscribe((res) => {
      this.colisOptions = res['content'];
    });
    this.product = { ...product };
    this.createProductDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.createProductDialog = false;
    this.submitted = false;
    this.assignColiDialog=false;
  }

}
