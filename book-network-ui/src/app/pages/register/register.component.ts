import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResgistrationRequest } from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private router: Router,
    private authService: AuthenticationService,

  ){}

  registerRequest: ResgistrationRequest = {email:'', firstname:'', lastname:'', password:''}
  errorMsg: Array<String> = [];

  login() {
    this.router.navigate(['login'])
  }

  register() {
    this.errorMsg = []
    this.authService.register({ body: this.registerRequest }).subscribe({
      next: () => {
        this.router.navigate(['activate-account'])
      },
      error: (err) => {
        this.errorMsg  = err.error.validationError;
      }
    })
  }

}
