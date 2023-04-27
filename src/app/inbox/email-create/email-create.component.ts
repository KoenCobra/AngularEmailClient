import {Component} from '@angular/core';
import {Email} from "../email";

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.scss']
})
export class EmailCreateComponent {
  showModel: boolean = false;
  email: Email

  constructor() {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      from: '',
      text: ''
    }
  }
}
