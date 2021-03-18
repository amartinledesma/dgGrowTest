import { Component, OnInit } from '@angular/core';
import { PotatoSalesService } from '../services/potato-sales/potato-sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  constructor(private psales: PotatoSalesService) {}

  products: [] = [];
  cols: any[] = [];
  salesFields: any[] = [];

  ngOnInit(): void {
    this.psales.getData().subscribe((potatoesData: any) => {
      this.cols = potatoesData.column;
      let salesData=this.cols.find( col => col["header"]==="Sales")
      this.salesFields = salesData["subHeaders"]
      this.products = potatoesData.data;
    });
  }
  calcTotal = (data:any):any =>{
    let total:number=0
    this.salesFields.forEach( (item:any) =>{
      total+=parseInt(data[item["field"]])
    })
    return total
  }
  
}
