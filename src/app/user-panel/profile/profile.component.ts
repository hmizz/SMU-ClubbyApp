import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/authentication/auth.service";
import { UserService } from "../user.service";
import { UserInfo } from "../userInfo.model";
import { Subscription } from "rxjs";
import { FormGroup, NgForm } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  public form: FormGroup;
  public userInfo: UserInfo;
  private userSub: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserInfo();
    this.userSub = this.userService
      .getUserUpdateListener()
      .subscribe((user: UserInfo) => {
        this.userInfo = user;
        console.log(this.userInfo);
      });
  }

  onUpdateUser(form : NgForm) {
    this.userService.updateUser(
      this.userInfo.id,
      form.value.firstName,
      form.value.lastName,
      form.value.gender,
      form.value.doBirth,
      form.value.level,
      form.value.institute,
      form.value.description,
      this.userInfo.user
    );
    this.userInfo = this.userService.getUser();
  }
}
