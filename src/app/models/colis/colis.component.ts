import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Products } from '../products/products.model';
import { Colis } from './colis.model';
import { ColisService } from './colisService.service';

@Component({
  selector: 'app-colis',
  templateUrl: './colis.component.html',
  styleUrls: ['./colis.component.css']

})
export class ColisComponent implements OnInit {

  colislist!: Colis[];
  statuses!: any[];
  assignedProducts!: Products[];

  coli!: Colis;
  coliDialog: boolean = false;
  visible: boolean = false;
  submitted: boolean = false;
  isNew: boolean = false;
  selectedColi: any | undefined;
  totalRecords!: number;
  metaKeySelection: boolean = true;

  constructor(private colisService: ColisService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.colisService.findAllColis().subscribe((res) => {
      this.colislist = res['content'];
    });
    this.statuses = [
      { label: 'In shipping', value: 'In shipping' },
      { label: 'Landed', value: 'Landed' },
      { label: 'Awaiting shipment', value: 'Awaiting shipment' }
    ];
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Awaiting shipment':
        return 'danger';

      case 'Landed':
        return 'success';

      case 'In shipping':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return null;
    }
  }

  addColi(coli: Colis) {
    this.coli = coli;
    this.colisService.createColis(this.coli).subscribe(data => {
      this.colislist.unshift(data);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Coli Created', life: 3000 });
      this.coliDialog = false;
    });
  }

  deleteColi(coliId: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete that coli' + coliId + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.colisService.deleteColis(coliId).subscribe((res) => {
          this.colislist = this.colislist.filter((val) => val.id !== coliId);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Coli Deleted', life: 3000 });
        });
      }
    });
  }

  showAssignedProducts(coliId: any) {
    this.selectedColi = coliId;
    this.colisService.getAllAssignedProducts(coliId).subscribe((data) => {
      this.assignedProducts = data;
    })
  }

  updateColi(coli: Colis) {
    this.coli = coli;
    this.colisService.updateColis(this.coli).subscribe(data => {
      let indexToUpdate = this.colislist.findIndex(item => item.id === data.id);
      this.colislist[indexToUpdate] = data;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Coli Updated', life: 3000 });
      this.coliDialog = false;
    });
  }

  openModule(coli?: Colis) {
    this.isNew = coli == null;
    this.coli = { ...coli };
    this.coliDialog = true;
    this.visible = true;
  }

  deleteProductFromColie(productId: any) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete that product' + productId + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.colisService.deleteProductFromColi(this.selectedColi, productId)
          .subscribe((X) => {
            this.assignedProducts = this.assignedProducts.filter((val) => val.id !== productId);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product deleted', life: 3000 });
          });
      }
    });

  }

  hideDialog() {
    this.coliDialog = false;
    this.submitted = false;
  }

}
