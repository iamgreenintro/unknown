import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../../services/user';

@Component({
  selector: 'dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public async getUsers() {
    const users = await this.userService.getAllUsers();
    console.log(users);

    // Fake loading for testing purposes:
    setTimeout(() => {
      this.isLoading$.next(false);
    }, 750);
  }

  public async createNewUser() {
    const payload = {
      username: 'user100',
      password: 'user100!',
    };
    const user = await this.userService.createNewUser(payload);
    console.log(user);

    // Fake loading for testing purposes:
    setTimeout(() => {
      this.isLoading$.next(false);
    }, 750);
  }
}
