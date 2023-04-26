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

interface SignedInResponse{
  authenticated:boolean;
  username:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://api.angular-email.com/';
  signedIn$ = new BehaviorSubject(false);

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

  checkAuth() {
    return this.http.get<SignedInResponse>(`${this.baseUrl}auth/signedin`)
      .pipe(
        tap(({authenticated}) => {
          this.signedIn$.next(authenticated);
        })
      )
  }
}
