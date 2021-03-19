import { Component, OnInit } from '@angular/core';
import { PotatoSalesService } from '../../services/potato-sales/potato-sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  constructor(private psales: PotatoSalesService) {}

  potatoes: [] = [];
  cols: any[] = [];
  salesFields: any[] = [];
  searchableFields: string[] = [];

  potato: {} = {};
  submitted: boolean = false;
  potatoDialog: boolean = true;

  ngOnInit(): void {
    this.psales.getData().subscribe((potatoesData: any) => {
      this.cols = potatoesData.column;

      let salesData = this.cols.find((col) => col['header'] === 'Sales');
      this.salesFields = salesData['subHeaders'];
      this.potatoes = potatoesData.data;
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

      console.log('this.searchableFields', this.searchableFields);
    });
  }
  calcTotal = (data: any): any => {
    let total: number = 0;
    this.salesFields.forEach((item: any) => {
      total += parseInt(data[item['field']]);
    });
    return total;
  };
  getSearchValue = (target: any): string => {
    const searchValue = (target as HTMLInputElement).value
      ? (target as HTMLInputElement).value
      : '';
    return searchValue;
  };
  openNew = () => {
    this.potato = {};
    this.submitted = false;
    this.potatoDialog = true;
  };
  hideDialog = () => {
    this.potatoDialog = false;
    this.submitted = false;
  }
}
