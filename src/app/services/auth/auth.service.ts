import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/shared/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  getValidUsers = ():Observable<Auth>  =>{
    return this.http.get<Auth>('assets/mocks/users.json');
  }

}
