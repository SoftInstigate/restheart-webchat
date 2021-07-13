import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly currentUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser$: Observable<boolean>;
  storage: Storage = window.sessionStorage;

  constructor() {
    this.currentUser$ = this.currentUser.asObservable();
  }

  getCurrentUser(): string {
    return this.storage.getItem('nickname');
  }

  setCurrentUser(nickname: string): void {
    this.storage.setItem('nickname', nickname);
    this.currentUser.next(true);
  }

}
