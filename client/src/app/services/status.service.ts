import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private connectionStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  connectionStatus$: Observable<string> = this.connectionStatus.asObservable()
    .pipe(map(state => state ? 'Connected' : 'Trying to reconnect'));

  constructor() { }

  isConnected(state: boolean) {
    this.connectionStatus.next(state);
  }
}
