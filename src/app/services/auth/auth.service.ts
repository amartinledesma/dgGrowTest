import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/shared/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  getValidUsers = ():Observable<any>  =>{
    return this.http.get<JSON>('assets/mock/users.json');
  }

}
