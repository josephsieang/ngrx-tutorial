import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, map, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import { setErrorMessage, setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { loginStart, loginSuccess } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
        return this.authService.login(action.email, action.password).pipe(
          finalize(() => this.store.dispatch(setLoadingSpinner({ status: false }))),
          map((data) => {
            const user = this.authService.formatUser(data);
            return loginSuccess({ user });
          }),
          catchError((err) => {
            const errMsg = this.authService.getErrorMessage(err.error.error.message);
            return of(setErrorMessage({ message: errMsg }));
          })
        );
      })
    );
  });
}
