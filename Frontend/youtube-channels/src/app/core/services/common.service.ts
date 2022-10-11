import { HostListener, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  @HostListener('mouseenter')
  mouseenter() {
    console.log("OMG It's a Mouse!!!");
  }

  @HostListener('mouseover')
  mouseover() {
    console.log("OMG It's still here!!!");
  }

  @HostListener('mouseout')
  mouseout() {
    console.log('Phew thank god it left!');
  }

  saveAuthToken(token: any, name: any, expIn: any): void {
    window.localStorage.setItem('token',token);
    window.localStorage.setItem('username',name);
    window.localStorage.setItem('expires_in',expIn);
  }

  checkAuthentication(): boolean {
    let authToken = window.localStorage.getItem('token');  
    if (authToken != null) {
      return true;
    }else {
      return false;
    }
  }

  checkTimeStamp(): void {
    const currentTimeStamp = Math.floor(Date.now() / 1000);
    const tokenExpiration: any = localStorage.getItem('expires_in');
    if(parseInt(tokenExpiration) <= currentTimeStamp){
      localStorage.clear();
      this.toastr.error("Token has been expired !!");
      this.router.navigate(['login']);
    }
  }
}
