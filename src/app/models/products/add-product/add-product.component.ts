import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Products } from '../products.model';
import { ProductsService } from '../productsService.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {


  product: Products;
  productFromGroup: FormGroup;

  constructor(private productService: ProductsService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.productFromGroup = this.formBuilder.group({
      'productName': [''],
      'quantity': [''],
      'priceSell': [''],
      'pricePerchase': [''],
      'fakePrice': [''],
      'mainPic': [''],
      'picSmall1Product': [''],
      'picSmall2Product': [''],
      'picSmall3Product': [''],
      'details': [''],
      'leagues': ['']
    });
  }




  addProduct(candidate: Products) {
    this.product = candidate;

    this.productService.createProduct(this.product).subscribe(data => {
      this.product = data;
      console.log("product has been create succesfully")
      // this.productslist.push(this.product);
      this.AddModelSucces();

    });

  }

  AddModelSucces() {
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.router.navigate(['listproducts']);
    })


  }

}
