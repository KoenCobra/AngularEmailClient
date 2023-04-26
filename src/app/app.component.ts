import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  signedIn = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe(() => {
    });

    this.authService.signedIn$.subscribe(((signedIn) => {
      this.signedIn = signedIn;
    }))
  }


  signOut() {
    this.authService.checkAuth().subscribe(() => {
    });
  }
}
