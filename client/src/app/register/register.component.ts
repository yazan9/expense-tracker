import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  errorMessage = "";
  
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) { }
  
  register(registerForm: any) {
    //make sure that inputs are valid
    if (registerForm.invalid) { 
      Object.keys( registerForm.controls).forEach(key => {
       registerForm.controls[key].markAsDirty();
      });
      return;
    }
    
    //if all is well, call the service function
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      this.errorMessage = err;
    });
  }

  ngOnInit() {
  }

}
