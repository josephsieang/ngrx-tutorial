import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { showFormFieldError } from 'src/app/utilities/form';
import { signUpStart } from '../state/auth.actions';
import { AuthState } from '../state/auth.state';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  showFormFieldError(formControlName: string, error: string): boolean {
    return showFormFieldError(this.signUpForm, formControlName, error);
  }

  onSignUp(): void {
    const signUpFormVal = this.signUpForm.getRawValue();
    this.store.dispatch(signUpStart(signUpFormVal));
  }
}
