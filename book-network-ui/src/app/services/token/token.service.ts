import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string) {
    localStorage.setItem('token', token)
  }

  get token() {
    return localStorage.getItem('token') as string;
  }

  isTokenValid() {
    const authToken = this.token
    if(!authToken){
      return false;
    }
    const jwtHelper = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired(authToken)
    if(isTokenExpired){
      localStorage.clear();
      return false
    }
    return true
  }

}
