import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'dgGrow-test-app';

  currentURL:string="";

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentURL=event.url
        }
    });
}
  ngOninit(){}
}
