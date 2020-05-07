import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AuthData } from "./auth-data.model";
import { EmailValidator } from "@angular/forms";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  message: boolean;
  isAuthenticated = false;
  userAcclevel : Number ;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private username: string;
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  getAccessLevel(){
    return this.userAcclevel ;
  }

  getUsername() {
    return this.username;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(fullName: string, email: string, password: string) {
    const authData: AuthData = {
      fullname: fullName,
      email: email,
      password: password,
    };
    this.http
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(["/login"]);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {
      fullname: null,
      email: email,
      password: password,
    };
    this.http
      .post<{ token: string; expiresIn: number; username: string; accessLevel: Number }>(
        "http://localhost:3000/api/user/login",
        authData
      )
      .subscribe(
        (response) => {
          this.message = true;
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.username = response.username;
            this.userAcclevel = response.accessLevel ;
            console.log(this.userAcclevel);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, response.username, response.accessLevel);
            this.router.navigate(["/"]);
            
          }
        },
        (err) => {
          this.message = false;
        }
      );
  }

  autoAuthUser(){
    const authdata =this.getAuthData();
    if(!authdata){
      return ;
    }
    const now =  new Date();
    const expiresIn = authdata.expirationDate.getTime() - now.getTime() ;
    if (expiresIn > 0){
      this.token = authdata.token;
      this.isAuthenticated =true;
      this.username = authdata.fullname ;
      this.userAcclevel = authdata.accessLevel ;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListener.next(true);
    }
  }
    private setAuthTimer(duration: number){
      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, duration * 1000);
    }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }
  private saveAuthData(token: string, expirationDate: Date, fullname : string, accessLevel : Number) {
    localStorage.setItem("token", token);
    localStorage.setItem("username", fullname);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("accesslevel",accessLevel.toString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("expiration");
    localStorage.removeItem("accesslevel");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const expirationDate = localStorage.getItem("expiration");
    const accessLevel = Number(localStorage.getItem("accesslevel"));
    if(!token && !expirationDate){
      return;
    }
    return {
      token : token,
      fullname : username,
      expirationDate : new Date(expirationDate),
      accessLevel : accessLevel
    }
  }
}
