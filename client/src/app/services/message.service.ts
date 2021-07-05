import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { Message } from '../models/message';
import { webSocket,  WebSocketSubjectConfig } from 'rxjs/webSocket';
import {UserService} from './user.service';
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private configuration: WebSocketSubjectConfig<Message> = {
    url: environment.MESSAGE_FEED,
    openObserver: {
      next: () => console.log('Connection established!')
    },
    closingObserver: {
      next: () => console.log('Connection has been closed')
    }
  };
  private ws: Subject<Message> = webSocket(this.configuration);

  private messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  constructor(private http: HttpClient, private userService: UserService) {
    this.getMessageHistory().subscribe(history => this.messages.next(history));
  }


  getChatMessages(): Observable<Message[]> {
    return this.messages.asObservable();
  }


  openConnection(): void {
    this.ws.asObservable().pipe(
      map((data) => {
        const { nickname, body, timestamp } = data['fullDocument'];
        return { nickname, body, timestamp };
      })
    ).subscribe(message => {
      this.messages.next([
        ...this.messages.getValue(),
        message
      ])
    });
  }

  sendMessage(body: string): void {
    const message: Message = { body, timestamp: new Date(), nickname: this.userService.getCurrentUser() };

    this.http.post(environment.MESSAGE_URL, message).subscribe();
  }


  private getMessageHistory(): Observable<Message[]> {
    return this.http.get<Message[]>(environment.MESSAGE_URL);
  }


}
