import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface UsernameAvailableResponse {
  available: boolean;
}

interface Credentials {
  username?: string | null | undefined,
  password?: string | null | undefined,
  passwordConfirmation?: string | null | undefined
}

interface SignupResponse {
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://api.angular-email.com/';

  constructor(private http: HttpClient) {
  }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(`${this.baseUrl}auth/username`, {
      username
    })
  }

  signUp(credentials: Credentials) {
    return this.http.post<SignupResponse>(`${this.baseUrl}auth/signup`,
      credentials
    )
  }
}