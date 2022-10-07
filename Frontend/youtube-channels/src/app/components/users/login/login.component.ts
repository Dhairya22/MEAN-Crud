import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { SubscriptionDisposer } from 'src/app/core/disposer';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends SubscriptionDisposer implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private apiService: ApiService
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
    this.apiService.login(this.loginForm.getRawValue())
      .pipe(takeUntil(this.destroyed$))
      .subscribe(resp => {
      });
  }
}