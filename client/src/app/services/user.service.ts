import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly currentUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser$: Observable<boolean>;

  constructor() {

    const nickname = localStorage.getItem('nickname') ? true : false;
    this.currentUser.next(nickname);

    this.currentUser$ = this.currentUser.asObservable();
  }


  getCurrentUser(): string {
    return localStorage.getItem('nickname');
  }

  setCurrentUser(nickname: string): void {
    localStorage.setItem('nickname', nickname);
    this.currentUser.next(true);
  }

  logout(): void {
    this.currentUser.next(false);
    localStorage.removeItem('nickname');
    console.log(`Current state: ${this.currentUser.getValue()}`);
  }

}
