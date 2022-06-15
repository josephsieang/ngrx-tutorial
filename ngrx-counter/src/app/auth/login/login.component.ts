import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { showFormFieldError } from 'src/app/utilities/form';
import { loginStart } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private store: Store<AppState>) {}

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
