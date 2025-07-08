import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public showLoginForm: boolean = true;

  // Login Form:
  public username = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  public password = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  constructor() {
    //
  }

  public login() {
    console.log(this.username.value, this.password.value);
  }

  public registerNewUser() {
    console.log(this.username.value, this.password.value);
  }
}
