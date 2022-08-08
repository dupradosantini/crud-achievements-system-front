import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router'
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs';

import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // get return url from route parameters or default to '/home'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  ngOnInit(): void {
  }

  submitLogin(email: string, password: string): void{
    this.authenticationService.login(email,password)
    .pipe(first())
    .subscribe({
      next: (response) => {
        this.router.navigate([this.returnUrl]);
        this.authenticationService.setUserName(email);
      },
      error: (error) => {
        this.error = error;
        console.log(this.error);
      }
    }
    )
  }
}
