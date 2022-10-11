import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriptionDisposer } from 'src/app/core/disposer';
import { takeUntil } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends SubscriptionDisposer implements OnInit {

  signupForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { super(); }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      re_password: new FormControl('', Validators.required),
    });
  }

  signup(): void {
    if(this.signupForm.valid){
      this.apiService.signup(this.signupForm.getRawValue())
        .pipe(takeUntil(this.destroyed$))
        .subscribe(resp => {
          if(resp.result){
            this.toastr.success(resp.message);
            this.router.navigate(['login']);
          }else {
            this.toastr.error(resp.message);
          }
        });
    }else {
      this.toastr.error('Please enter details !!');
    }
  }
}