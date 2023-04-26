import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, tap} from "rxjs";

interface UsernameAvailableResponse {
  available: boolean;
}

interface Credentials {
  username?: string | null | undefined;
  password?: string | null | undefined;
  passwordConfirmation?: string | null | undefined;
}

interface SignupResponse {
  username: string
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

interface SignInCredentials {
  username?: string | null | undefined;
  password?: string | null | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://api.angular-email.com/';
  signedIn$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(`${this.baseUrl}auth/username`, {
      username
    })
  }

  signUp(credentials: Credentials) {
    return this.http.post<SignupResponse>(`${this.baseUrl}auth/signup`, credentials).pipe(
      tap(() => {
        this.signedIn$.next(true);
      })
    );
  }

  signOut() {
    return this.http.post<any>(`${this.baseUrl}auth/signout`, {}).pipe(
      tap(() => {
        this.signedIn$.next(false);
      })
    );
  }

  signIn(credentials: SignInCredentials) {
    return this.http.post<any>(`${this.baseUrl}auth/signin`, credentials).pipe(
      tap(() => {
        this.signedIn$.next(true);
      })
    );
  }

  checkAuth() {
    return this.http.get<SignedInResponse>(`${this.baseUrl}auth/signedin`)
      .pipe(
        tap(({authenticated}) => {
          this.signedIn$.next(authenticated);
        })
      )
  }
}
