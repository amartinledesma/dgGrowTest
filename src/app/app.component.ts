import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'dgGrow-test-app';
  currentURL:string="";

  constructor(private router: Router) {
    //Router subscriber
    this.router.events.subscribe((event: any) => {
      
        // if (event instanceof NavigationStart) {
        //     //do something on start activity
        // }

        // if (event instanceof NavigationError) {
        //     // Handle error
        //     console.error(event.error);
        // }

        if (event instanceof NavigationEnd) {
          this.currentURL=event.url
        }
    });
}

  ngOninit(){}
}
