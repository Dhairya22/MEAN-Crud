import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private commonService: CommonService,
    private router: Router
  ) { }

  canActivate() {
    let isAuthenticate = this.commonService.checkAuthentication(); 
    if(!isAuthenticate){
      return true;
    } else {
      this.router.navigate(['list']);
      return false;
    }
  }  
}