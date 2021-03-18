import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckUrlService {
  constructor(private route:Observable<ActivatedRoute>) { }
  getURL = ():Observable<any> =>{
    return this.route
  }
}
