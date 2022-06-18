import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { logout } from '../auth/state/auth.actions';
import { AuthState } from '../auth/state/auth.state';
import { AuthResponseData } from '../models/auth-response-data';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  timeoutInterval?: any;

  private readonly USER_DATA = 'USER_DATA';

  constructor(private http: HttpClient, private store: Store<AuthState>) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    );
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    );
  }

  formatUser(data: AuthResponseData): User {
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
    const user = new User(data.email, data.idToken, data.localId, expirationDate);

    return user;
  }

  getErrorMessage(message: string): string {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not found';
      case 'INVALID_PASSWORD':
        return 'Invalid password';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      default:
        return 'Please contact Joseph';
    }
  }

  setUserInLocalStorage(user: User): void {
    localStorage.setItem(this.USER_DATA, JSON.stringify(user));

    this.runTimeoutInterval(user);
  }

  getUserFromLocalStorage(): User | null {
    const userDataString = localStorage.getItem(this.USER_DATA);

    if (userDataString) {
      const { email, token, localId, expirationDate } = JSON.parse(userDataString);
      const user = new User(email, token, localId, new Date(expirationDate));
      this.runTimeoutInterval(user);
      return user;
    }

    return null;
  }

  logout(): void {
    localStorage.removeItem(this.USER_DATA);
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }

  private runTimeoutInterval(user: User): void {
    const todayDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todayDate;

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(logout());
    }, timeInterval);
  }
}
