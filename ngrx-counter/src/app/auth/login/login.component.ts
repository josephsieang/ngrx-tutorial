import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { showFormFieldError } from 'src/app/utilities/form';
import { loginStart } from '../state/auth.actions';
import { AuthState } from '../state/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  showFormFieldError(formControlName: string, error: string): boolean {
    return showFormFieldError(this.loginForm, formControlName, error);
  }

  onLogin(): void {
    const loginFormVal = this.loginForm.getRawValue();

    this.store.dispatch(loginStart(loginFormVal));
  }
}
