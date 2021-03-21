import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PotatoSalesService {
  constructor(private http: HttpClient) {}

  private potatoSalesData:BehaviorSubject<any> = new BehaviorSubject([{}]);
  currentpotatoSalesData = this.potatoSalesData.asObservable();

  getData = (): Observable<any> => {
    return this.http.get('assets/potato_sales.json');
  };

  updateData = (data: any) => {    
    this.potatoSalesData.next(data);
  }
}
