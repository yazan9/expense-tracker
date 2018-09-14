import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  errorMessage = "";
  
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) { }
  
  login(loginForm : any) {
    //make sure that inputs are valid
    if (loginForm.invalid) { 
      Object.keys( loginForm.controls).forEach(key => {
       loginForm.controls[key].markAsDirty();
      });
      return;
    }
    
    //if all is well, call the service function
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      this.errorMessage = err;
    });
  }

  ngOnInit() {
  }

}
