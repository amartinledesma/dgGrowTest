import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Auth } from 'src/app/shared/auth.model';
import { FormControl } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authUser: AuthService, private messageService:MessageService) {}

  userName: FormControl=new FormControl('');
  password: FormControl=new FormControl('');

  validUsers: Array<Auth> = [];

  msgs: Message[]=[]

  ngOnInit(): void {
    this.authUser.getValidUsers().subscribe((data) => {
      this.validUsers = data.users ? data.users : [];
    });
  }

  validateLogin = () => {
    this.messageService.clear()
    if((this.userName.value && this.userName.value !=='') && (this.password.value && this.password.value !=='')) {
      const loginUser: Auth = {
        userName: this.userName.value,
        password: this.password.value,
      };
      let userExists: boolean=false;
      userExists = this.userExists(loginUser.userName,loginUser.password);
      if(userExists)this.router.navigate(['/welcome']) 
      else {
        this.resetForm()
        this.messageService.add({severity:'error', detail:'Username or Password invalid'});
      }
      
    }
    else{
      this.resetForm()
      this.messageService.add({severity:'error', detail:'Provide a Username and a Password'});
    }
  };

 userExists = (username:string, password:string) => {
    return this.validUsers.some(function(el) {
      return el.userName === username && el.password === password;
    }); 
  }

  resetForm = () =>{
    this.messageService.clear()
    this.userName.setValue('');
    this.password.setValue('');
  }
}
