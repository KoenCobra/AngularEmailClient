import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AbstractControl, AsyncValidator} from "@angular/forms";
import {catchError, map, of} from "rxjs";
import {AuthService} from "../auth.service";

@Injectable({providedIn: 'root'})
export class UniqueUsername implements AsyncValidator {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  validate = (control: AbstractControl) => {
    const {value} = control;

    return this.authService.usernameAvailable(value).pipe(
      map(() => {
        return null;
      }),
      catchError((err) => {
        if (err.error.username) {
          return of({nonUniqueUsername: true})
        } else {
          return of({noConnection: true})
        }
      })
    );
  };
}
