import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PotatoSalesService } from '../../services/potato-sales/potato-sales.service';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit, OnDestroy {
  constructor(private ps: PotatoSalesService) {}

  @ViewChild(NewProductComponent) child: any;

  potatoSalesList: Array<JSON> = [];
  cols: any[] = [];
  salesFields: any[] = [];
  searchableFields: string[] = [];
  predefinedData: any = {};

  submitted: boolean = false;
  potatoDialog: boolean = false;

  message: any;
  subscription: Subscription = new Subscription();

  ngOnInit() {
    this.ps.getData().subscribe((potatoesData: any) => {
      this.cols = potatoesData.column;
      this.predefinedData = potatoesData.data;

      let salesData = this.cols.find((col) => col['header'] === 'Sales');
      this.salesFields = salesData['subHeaders'];

      if (
        this.message &&
        this.message.length &&
        Object.keys(this.message[this.message.length - 1]).length === 0
      )
        this.message.pop();
      this.potatoSalesList = [...this.message, ...this.predefinedData];

      this.salesFields.forEach((saleField) => {
        if (saleField['field'])
          this.searchableFields = [
            saleField['field'],
            ...this.searchableFields,
          ];
      });
      this.cols.forEach((col) => {
        if (col['field'])
          this.searchableFields = [col['field'], ...this.searchableFields];
      });
    });
    this.subscription = this.ps.currentpotatoSalesData.subscribe((message) => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  calcTotal = (data: any): any => {
    let total: number = 0;
    this.salesFields.forEach((item: any) => {
      total += parseInt(data[item['field']]);
    });
    return !isNaN(total) ? total : 0;
  };

  getSearchValue = (target: any): string => {
    const searchValue = (target as HTMLInputElement).value
      ? (target as HTMLInputElement).value
      : '';
    return searchValue;
  };

  openAddNewProduct = () => {
    this.submitted = false;
    this.potatoDialog = true;
  };

  refreshSalesList = (): boolean => {
    this.submitted = this.child.formSubmitted;
    this.child.resetForm();
    if (this.submitted) {
      this.submitted = false;
      this.potatoDialog = false;
      this.submitted = false;
      if (
        this.message &&
        this.message.length &&
        Object.keys(this.message[this.message.length - 1]).length === 0
      )
        this.message.pop();
      this.potatoSalesList = [...this.message, ...this.predefinedData];
      return true;
    } else return false;
  };
}