import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from '../models/message';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private MESSAGE_FEED = 'ws://localhost:8080/messages/_streams/all';
  private URL = 'http://localhost:8080/messages';

  private h = {
    Update: 'websocket',
    Connection: 'Upgrade'
  };

  private configuration: WebSocketSubjectConfig<Message> = {
    url: this.MESSAGE_FEED,
    openObserver: {
      next: () => console.log('Connection established!')
    },
    closingObserver: {
      next: () => console.log('Connection has been closed')
    }
  };
  private ws: Subject<Message> = webSocket(this.configuration);
  private headers = { Authorization: 'Basic ' + window.btoa('admin:secret')};


  constructor(private http: HttpClient, private userService: UserService) { }


  openConnection(): Subject<Message> {
    return this.ws;
  }

  sendMessage(body: string): void {
    const message: Message = { body, timestamp: new Date(), nickname: this.userService.getCurrentUser() };

    this.http.post(this.URL, message, { headers: this.headers }).subscribe();
  }


  getMessageHistory(): Observable<Message[]> {
    return this.http.get<Message[]>(this.URL);
  }


}
