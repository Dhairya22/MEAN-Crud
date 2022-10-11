import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { SubscriptionDisposer } from 'src/app/core/disposer';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends SubscriptionDisposer implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    private toastr: ToastrService,
    private router: Router
  ) { super(); }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm(): void {
    this.loginForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login(): void {
    if(this.loginForm.valid){
      this.apiService.login(this.loginForm.getRawValue())
        .pipe(takeUntil(this.destroyed$))
        .subscribe(resp => {
          if(resp.token){
            this.toastr.success('Login Successfull !!');
            this.commonService.saveAuthToken(resp.token, resp.name, resp.expiresIn);
            this.router.navigate(['list'])
          }else {
            debugger
            this.toastr.error('Invalid Username or Password !!');      
          }
        });
    }else {
      this.toastr.error('Please enter details !!');
    }
  }
}