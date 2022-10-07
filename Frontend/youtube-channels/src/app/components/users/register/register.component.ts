import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriptionDisposer } from 'src/app/core/disposer';
import { takeUntil } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends SubscriptionDisposer implements OnInit {

  signupForm!: FormGroup;

  constructor(
    private apiService: ApiService
  ) { super(); }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  signup(): void {
    this.apiService.signup(this.signupForm.getRawValue())
      .pipe(takeUntil(this.destroyed$))
      .subscribe(resp => {
      });
  }
}