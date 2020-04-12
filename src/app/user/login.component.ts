import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import * as fromUser from "./state/user.reducer";
import { AuthService } from "./auth.service";
import { Store, select } from "@ngrx/store";
import { UserActions } from "./state/action-types";
import { getMaskUserName } from "./state/user.selectors";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  pageTitle = "Log In";
  errorMessage: string;

  maskUserName: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store$: Store<fromUser.UserState>
  ) {}

  ngOnInit(): void {
    this.store$
      .pipe(select(getMaskUserName))
      .subscribe((option) => (this.maskUserName = option));
  }

  cancel(): void {
    this.router.navigate(["welcome"]);
  }

  checkChanged(value: boolean): void {
    this.store$.dispatch(UserActions.maskUserName({ maskUserName: value }));
    // this.maskUserName = value;
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(["/products"]);
      }
    } else {
      this.errorMessage = "Please enter a user name and password.";
    }
  }
}
