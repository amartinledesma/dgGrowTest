import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit, OnChanges {
  constructor(private router: Router) {}

  menuItems: MenuItem[] = [];
  currentURL: string = '';

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'New Product',
        icon: 'pi pi-plus-circle',
        routerLink: ['new-product'],
        routerLinkActiveOptions: { exact: true },
        styleClass: 'ml-4 p-2',
      },
      {
        label: 'Sales',
        icon: 'pi pi-chart-line',
        routerLink: ['sales'],
        routerLinkActiveOptions: { exact: true },
        styleClass: 'ml-2 p-2',
      },
    ];
  }
  logOut = () => {
    this.router.navigate(['']);
  };
  ngOnChanges() {}
}
