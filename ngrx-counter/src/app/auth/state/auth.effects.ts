import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import { setErrorMessage, setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { autoLogin, loginStart, loginSuccess, signUpStart, signUpSuccess } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>, private router: Router) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
        return this.authService.login(action.email, action.password).pipe(
          finalize(() => this.store.dispatch(setLoadingSpinner({ status: false }))),
          map((data) => {
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
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

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap({
          next: () => {
            this.store.dispatch(setErrorMessage({ message: '' }));
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUpStart),
      exhaustMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
        const { email, password } = action;
        return this.authService.signUp(email, password).pipe(
          finalize(() => this.store.dispatch(setLoadingSpinner({ status: false }))),
          map((data) => {
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return signUpSuccess({ user });
          }),
          catchError((err) => {
            const errMsg = this.authService.getErrorMessage(err.error.error.message);
            return of(setErrorMessage({ message: errMsg }));
          })
        );
      })
    );
  });

  signUpRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signUpSuccess),
        tap({
          next: () => {
            this.store.dispatch(setErrorMessage({ message: '' }));
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap(() => {
        const user = this.authService.getUserFromLocalStorage();
        if (user) {
          return of(loginSuccess({ user }));
        }
        return of();
      })
    );
  });
}
