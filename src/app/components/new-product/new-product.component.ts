import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  date1: any;
  
  minDate: Date=new Date();

  maxDate: Date=new Date();

  es: any;

  invalidDates: Array<Date>=[]

  isRequired:boolean=true

  text1:any

  ngOnInit() {
      this.es = {
          firstDayOfWeek: 1,
          dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
          dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
          dayNamesMin: [ "D","L","M","X","J","V","S" ],
          monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
          monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
          today: 'Hoy',
          clear: 'Borrar'
      }

      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let prevMonth = (month === 0) ? 11 : month -1;
      let prevYear = (prevMonth === 11) ? year - 1 : year;
      let nextMonth = (month === 11) ? 0 : month + 1;
      let nextYear = (nextMonth === 0) ? year + 1 : year;
      this.minDate.setMonth(prevMonth);
      this.minDate.setFullYear(prevYear);
      this.maxDate.setMonth(nextMonth);
      this.maxDate.setFullYear(nextYear);

      let invalidDate = new Date();
      invalidDate.setDate(today.getDate() - 1);
      this.invalidDates = [today,invalidDate];
  }

}
