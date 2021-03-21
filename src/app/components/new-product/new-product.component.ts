import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PotatoSalesService } from 'src/app/services/potato-sales/potato-sales.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  providers: [MessageService],
})
export class NewProductComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private ps: PotatoSalesService,
    private router:Router
  ) {}

  @Input() inDialog:boolean=false

  date1: any;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  en: any;
  invalidDates: Array<Date> = [];

  formNewProduct: FormGroup = new FormGroup({});
  formSubmitted: boolean = false;


  msgs: Message[] = [];

  message: any = {};
  subscription: Subscription = new Subscription();
  tempArray: Array<JSON> = [];

  currentURL:string='';

  get formNewProductControl() {
    return this.formNewProduct.controls;
  }

  ngOnInit() {
    this.currentURL=this.router.url;
    this.setCalendar();
    this.formNewProduct = this.fb.group({
      productName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      productID: new FormControl('', [
        Validators.required,
        Validators.pattern('^([0-9]{13})$'),
      ]),
      productManager: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      salesStartDate: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
    });
    this.subscription = this.ps.currentpotatoSalesData.subscribe((message) => {
      this.message = JSON.parse(JSON.stringify(message));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setCalendar = () => {
    this.en = {
      firstDayOfWeek: 1,
      dayNames: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      monthNames: [
        'Januar',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ],
      today: 'Today',
      clear: 'Clear',
    };

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
  };

  submitForm = () => {
    this.messageService.clear();
    this.formSubmitted = true;
    try {
      this.addNewProduct(this.formNewProduct.value);
      const detail=JSON.stringify(this.formNewProduct.value).replaceAll(/,"/ig,', "')
      this.messageService.add({
        severity: 'success',
        detail: `New Product succesfully added ${detail}`,
      });
    } catch (e) {
      this.messageService.add({
        severity: 'error',
        detail: `Error adding the New Product`,
      });
    }
  };

  resetForm = () => {
    this.formSubmitted = false;
    this.formNewProduct.reset();
  };

  addMoreProducts = () => {
    this.messageService.clear();
    this.resetForm();
  };

  addNewProduct(data: any) {
    let dataMappedForSalesList = {
      productID: data.productID?data.productID:'0000000000000',
      productName: data.productName?data.productName:'N/A',
      salesQ1: Math.floor(Math.random() * 999).toString(),
      salesQ2: Math.floor(Math.random() * 999).toString(),
      salesQ3: Math.floor(Math.random() * 999).toString(),
      salesQ4: Math.floor(Math.random() * 999).toString(),
    };
    this.message.unshift(dataMappedForSalesList);
    this.ps.updateData(this.message);
  }
}