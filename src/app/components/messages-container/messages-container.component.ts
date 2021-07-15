import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { MessageService } from '../../services/message.service';
import { MessageComponent } from '../message/message.component';
import { Message } from '../../models/message';
import {filter, groupBy, map, mergeMap, scan, startWith, switchMap, tap, toArray} from 'rxjs/operators';
import {from, GroupedObservable, iif, Observable} from 'rxjs';
import {StatusService} from '../../services/status.service';

interface MessageGroups {
  date: Date;
  messages: Message[]
}

@Component({
  selector: 'app-messages-container',
  templateUrl: './messages-container.component.html',
  styleUrls: ['./messages-container.component.scss']
})
export class MessagesContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('flag') private flag: ElementRef<HTMLDivElement>;
  @ViewChildren('msg') private containerChildren: QueryList<MessageComponent>;

  messages$: Observable<MessageGroups[]>;
  currentPage = 1;
  firstElement: MessageComponent;

  loadMoreAction = false;
  hasMoreMessagesToLoad = true;
  messageCount = 0;

  constructor(
    private messageService: MessageService,
    private elRef: ElementRef,
    public statusService: StatusService
  ) { }

  ngOnInit(): void {
    /*
    Note: reduce() === toArray()
    Given a stream of messages group them by date. Ignore all messages without date
    Ex: [msg1, msg2,...] => [ {date: '12-04-2021', messages: [msg1, ...] }, {key: '12-05-2021', messages: [msg5, ...] }]
     */
    this.messages$ = this.messageService.getChatMessages().pipe(
      // given an observable of messages[] get rid of those without a timestamp
      map((message: Message[]) => message.filter(m => m.timestamp && m.timestamp.$date)),
      switchMap((messages: Message[]) => from(messages).pipe(
        groupBy(
          ({timestamp}) => (new Date(timestamp.$date)).toDateString(),
            message => message
        ),
        mergeMap((group$: GroupedObservable<string, Message>) =>
          group$.pipe(
            toArray(),  // equivalent to reduce() -> from groupedObservable of messages to array of messages
            map((messageArray: Message[]): MessageGroups => ({ date: new Date(group$.key), messages: messageArray}))
          )
        ),
        toArray() // wait for all groups to be emitted and collect them in one single array
      ))
    );
  }

  ngAfterViewInit(): void {
    this.containerChildren.changes.pipe(
      startWith([]),
      scan((firstValue, value) => {
          if (!this.loadMoreAction) {
            if (!firstValue ) {
              this.scrollBottom('auto');
            } else { this.scrollBottom('smooth'); }
            firstValue = value;
          } else {
            this.scrollBottom('auto', this.firstElement);
            this.loadMoreAction = !this.loadMoreAction;
            this.firstElement = null;
          }
        },
        null
      )
    ).subscribe();
  }

  loadMore() {
    this.firstElement = this.containerChildren.first;
    this.loadMoreAction = true;
    this.messageService.getOlderMessages(++this.currentPage);
  }

  scrollBottom(behavior: ScrollBehavior = 'auto', scrollRef?: MessageComponent): void {
    this.elRef.nativeElement.style.scrollBehavior = behavior;
    if (scrollRef) {
      this.elRef.nativeElement.scrollTop = scrollRef.elRef.nativeElement.offsetTop - 400;
    } else {
      this.elRef.nativeElement.scrollTop = this.elRef.nativeElement.scrollHeight;
    }
  }
}
