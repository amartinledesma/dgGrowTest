import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckUrlService {
  constructor(private route:ActivatedRoute) { }
  getURL = ():ActivatedRoute =>{
    return this.route
  }
}
