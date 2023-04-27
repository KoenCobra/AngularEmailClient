import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Email} from "../email";
import {EmailService} from "../email.service";

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.scss']
})
export class EmailReplyComponent implements OnChanges {
  showModal: boolean = false;
  @Input() email!: Email

  constructor(private emailService: EmailService) {
  }

  replyEmail(email: Email) {
    this.emailService.replyEmail(email).subscribe(() => {
      this.showModal = false
    });
  }

  ngOnChanges(): void {
    const text = this.email.text.replace(/\n/gi, '\n> ')
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n ---------------------------------\n${this.email.from} wrote:\n> ${text}`
    }
  }
}
