import {AbstractControl, FormGroup, ValidationErrors, Validator} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class MatchPassword implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;
    const {password, passwordConfirmation} = formGroup.value;

    if (password === passwordConfirmation) {
      return null;
    } else {
      return {passwordsDontMatch: true}
    }
  }
}

