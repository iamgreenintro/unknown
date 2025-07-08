import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private _users$: BehaviorSubject<unknown> = new BehaviorSubject<unknown>([]);
  constructor() {}

  get users() {
    return this._users$.getValue();
  }

  public usersObservable$: Observable<unknown> = this._users$.asObservable();

  public updateUsers(users: unknown) {
    this._users$.next(users);
  }

  public destroy(): void {
    this._users$.next(null);
  }
}
