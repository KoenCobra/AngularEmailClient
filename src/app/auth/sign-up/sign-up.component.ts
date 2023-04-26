import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatchPassword} from "../validators/match-password";
import {UniqueUsername} from "../validators/unique-user-name";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/)
        ],
        [this.uniqueUsername.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ])
    },
    {validators: [this.matchPassword.validate]}
  );

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return
    }
    this.authService.signUp(this.authForm.value).subscribe({
      next: (response) => {

      },
      error: (error) => {
        if (!error.status) {
          this.authForm.setErrors({noConnection: true})
        } else {
          this.authForm.setErrors({unKnowError: true})
        }
      }
    });
  }
}

