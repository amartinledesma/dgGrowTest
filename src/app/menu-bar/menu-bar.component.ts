import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CheckUrlService } from '../services/check-url/check-url.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit, OnChanges {

  constructor(private router:Router,
    private url:CheckUrlService) {}

  items:MenuItem[]=[]

  ngOnInit():void {
    this.items = [
      {
        label: 'New Product',
        icon: 'pi pi-fw pi-file',
        routerLink: ['new-product'],
        routerLinkActiveOptions: {exact:true}
      },
      {
        label: 'Sales',
        icon: 'pi pi-fw pi-pencil',
        routerLink: ['sales'],
        routerLinkActiveOptions: {exact:true}
      },
    ];
    // this.route.url.subscribe(url => {
    //   console.log('pepe',url[0].path)
      
    // })
    console.log(this.url.getURL())
    
  }

  logOut = () =>{
    this.router.navigate([''])

  }
  ngOnChanges(){
  
  }

}
