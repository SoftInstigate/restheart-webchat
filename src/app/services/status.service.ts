import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private connectionStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  connectionStatus$: Observable<boolean> = this.connectionStatus.asObservable();

  constructor() { }

  isConnected(state: boolean) {
    this.connectionStatus.next(state);
  }
}
