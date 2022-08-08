import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  backToLogin(){
    this.router.navigate(['/login']);
  }

  registerAccount(name: string, email: string, password: string):void{
    this.authenticationService.signUp(name,email,password)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.backToLogin();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
