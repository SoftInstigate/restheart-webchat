import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, interval, Observable, Subject, Subscription, throwError, timer} from 'rxjs';
import { Message } from '../models/message';
import { webSocket, WebSocketSubjectConfig } from 'rxjs/webSocket';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';
import {catchError, delay, delayWhen, filter, map, retryWhen, startWith, tap} from 'rxjs/operators';
import {StatusService} from './status.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private intervalSubscription: Subscription;

  private configuration: WebSocketSubjectConfig<Message> = {
    url: environment.MESSAGE_FEED,
    openObserver: {
      next: () => {
        this.intervalSubscription = interval(
          30000
        ).subscribe(() => {
          console.log('Sending ping to ws');
          this.ws.next({from: '', message: '', timestamp: {$date: 123}});
        });

        console.log('Connected!');
        this.statusService.isConnected(true);

        if (!this.hasHistoryBeenLoaded) {
          this.getMessageHistory()
            .subscribe(
              history => {
                this.messages.next(history.reverse());
                this.hasHistoryBeenLoaded = true;
                console.log('History has been loaded');
              },
              (err) => console.error(err)
            );
        }
      }
    },
    closeObserver: {
      next: () => {
        if (this.intervalSubscription) {
          this.intervalSubscription.unsubscribe();
        }
        console.log('Trying to reconnect');
        this.statusService.isConnected(false);
      }
    }
  };
  private ws: Subject<Message> = webSocket(this.configuration);

  private messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  private hasHistoryBeenLoaded = false;

  constructor(private http: HttpClient, private userService: UserService, private statusService: StatusService) { }

  getChatMessages(): Observable<Message[]> {
    return this.messages.asObservable();
  }

  getOlderMessages(page = 1): void {
    this.getMessageHistory(page)
      .subscribe(
        history => {
          this.messages.next([...history.reverse(), ...this.messages.getValue()]);
        },
        () => console.error('Could not load messages')
      );
  }


  openConnection(): void {
    this.ws.pipe(
      retryWhen(errors => errors.pipe(
       delay(environment.RECONNECTION_DELAY)
        )
      ),
      map((data) => {
        const { from, message, timestamp } = data.fullDocument;
        return { from, message, timestamp };
      }),
    ).subscribe(
        message => {
          this.messages.next([
            ...this.messages.getValue(),
            message
          ]);
      },
      (error) => {
        console.error(`Got an error: ${error}`);
      });
  }

  sendMessage(message: string): void {
    const toSend = { message, from: this.userService.getCurrentUser() };

    this.http.post(environment.MESSAGE_URL, toSend).pipe(
      catchError(this.errorHandler)
    ).subscribe();
  }


  private getMessageHistory(page = 1, pageSize = 15): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.MESSAGE_URL}?page=${page}&pagesize=${pageSize}&sort={timestamp:-1}`)
      .pipe(catchError(this.errorHandler));
  }


  private errorHandler = (error: HttpErrorResponse) =>  {
    let errorMessage = '';
    if (error.status === 0) {
      errorMessage = `Network error. Status was: ${error.status}.`;
    } else {
      errorMessage = `Backend response status: ${error.status}. Backend body: ${error.error.message}`;
    }
    return throwError(errorMessage);
  }

}
