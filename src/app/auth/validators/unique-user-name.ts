import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AbstractControl, AsyncValidator} from "@angular/forms";

@Injectable({providedIn: 'root'})
export class UniqueUsername implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate = (control: AbstractControl) => {
    const { value } = control;
    console.log(value)

    return this.http.post<any>('https://api.angular-email.com/auth/username', {
      username: value
    });
  };
}
