import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Customer, Representative } from './customer';
import { CustomerService } from './customerservice.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customers!: Customer[];

  totalRecords!: number;

  loading: boolean = false;

  representatives!: Representative[];

  selectAll: boolean = false;
  metaKeySelection: boolean = true;

  selectedCustomers!: Customer[];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
    ];


    this.customerService.getCustomers().then((res) => {
      this.customers = res.customers;
      this.totalRecords = res.totalRecords;
      this.loading = false;
    });

    this.loading = true;
  }

  // loadCustomers(event: LazyLoadEvent) {
  //   this.loading = true;

  //   setTimeout(() => {
  //     this.customerService.getCustomers({ lazyEvent: JSON.stringify(event) }).then((res) => {
  //       this.customers = res.customers;
  //       this.totalRecords = res.totalRecords;
  //       this.loading = false;
  //     });
  //   }, 1000);
  // }

  onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedCustomers = value;
  }

  onSelectAllChange(event: any) {
    const checked = event.checked;

    if (checked) {
      this.customerService.getCustomers().then((res) => {
        this.selectedCustomers = res.customers;
        this.selectAll = true;
      });
    } else {
      this.selectedCustomers = [];
      this.selectAll = false;
    }
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: string) {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return null;
    }
  }
}