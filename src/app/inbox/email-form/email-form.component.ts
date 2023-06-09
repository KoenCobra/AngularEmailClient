import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Email} from "../email";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {
  emailForm = new FormGroup({
    to: new FormControl(''),
    from: new FormControl(''),
    subject: new FormControl(''),
    text: new FormControl('')
  });
  @Input() email!: Email;
  @Output() createEmail = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    const {subject, from, to, text} = this.email;

    this.emailForm = new FormGroup({
      to: new FormControl(to, [
        Validators.required, Validators.email
      ]),
      from: new FormControl({value: from, disabled: true}),
      subject: new FormControl(subject, [
        Validators.required
      ]),
      text: new FormControl(text, [
        Validators.required])
    });
  }

  onSubmit() {
    if (this.emailForm.invalid) {
      return;
    }

    this.createEmail.emit(this.emailForm.value)
  }
}
