import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Products } from '../products.model';
import { ProductsService } from '../productsService.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class ListProductComponent implements OnInit {

  productslist!: Products[];
  product!: Products;


  statuses!: any[];

  visible: boolean = false;
  productDialog: boolean = false;
  submitted: boolean = false;
  images: any[] | undefined;
  productFromGroup: FormGroup;

  responsiveOptions: any[] | undefined;

  //******************** */
  // customers!: Customer[];

  totalRecords!: number;

  loading: boolean = false;

  selectAll: boolean = false;
  metaKeySelection: boolean = true;

  selectedProducts!: Products[];

  constructor(private productService: ProductsService, private router: Router,
    private formBuilder: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService) { }



  trackByIdx(index: number, obj: any): any {
    return index;
  }
  ngOnInit(): void {
    // this.photoService.getImages().then((images) => (this.images = images));


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
    this.loading = true;


    this.productFromGroup = this.formBuilder.group({
      'productName': [''],
      'quantity': [''],
      'priceSell': [''],
      'mainPic': [''],
      'details': [''],
      'leagues': [''],
      'showPic': this.formBuilder.array([]),

    });

  }

  onSelectionChange(value = []) {

    console.log("onSelectionChange" + JSON.stringify(this.selectedProducts))
    this.selectAll = value.length === this.totalRecords;
    this.selectedProducts = value;
  }

  onSelectAllChange(event: any) {
    const checked = event.checked;
    console.log("onSelectAllChange")

    if (checked) {
      this.productService.findAllProducts().subscribe((res) => {
        this.selectedProducts = res['content'];
        this.selectAll = true;
      });
    } else {
      this.selectedProducts = [];
      this.selectAll = false;
    }
  }


  filterArray(arr) {

    return arr != null ? arr.filter((value) => value != null && value != '') : [];
  }
  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: string) {

    // console.log("heeeeeeeeeer " + status)
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
    console.log("product " + product)
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.productName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("hee000eye")
        this.productService.deleteProduct(product).subscribe((res) => {
          this.productslist = this.productslist.filter((val) => val.id !== product.id);
          // this.product = {};
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        });

      }
    });
  }

  updateProduct(product: Products) {
    this.product = product;
    console.log("product has  been retrieved " + JSON.stringify(product))

    this.productService.updateProduct(this.product).subscribe(data => {
      this.product = data;
      console.log("product has been create succesfully")
      
		
      let indexToUpdate = this.productslist.findIndex(item => item.id === data.id);
      this.productslist[indexToUpdate] = data;	
      // this.productslist.push(this.product);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      this.productDialog = false;

    });
  }

  editProduct(product: Products) {

    console.log("hhhhd" + JSON.stringify(this.productslist))
    this.product = { ...product };
    this.productDialog = true;
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }



}
