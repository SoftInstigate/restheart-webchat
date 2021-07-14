import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MessageService} from '../../services/message.service';
import {MessageComponent} from '../message/message.component';
import {Message} from '../../models/message';
import {filter, groupBy, map, mergeMap, reduce, scan, startWith, switchMap, tap} from 'rxjs/operators';
import {from, GroupedObservable} from 'rxjs';
import {StatusService} from '../../services/status.service';

@Component({
  selector: 'app-messages-container',
  templateUrl: './messages-container.component.html',
  styleUrls: ['./messages-container.component.scss']
})
export class MessagesContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('flag') private flag: ElementRef<HTMLDivElement>;
  @ViewChildren('msg') private containerChildren: QueryList<MessageComponent>;

  // messageGroups$: Observable<[number, Message[]]>;
  messageGroups: Map<string, Message[]> = new Map();
  currentPage = 1;
  firstElement: MessageComponent;

  loadMoreAction = false;

  constructor(
    private messageService: MessageService,
    private elRef: ElementRef,
    public statusService: StatusService
  ) { }

  ngOnInit(): void {

    this.messageService.getChatMessages().pipe(
      switchMap( (messages: Message[]) =>
        from(messages).pipe(
          groupBy(
            message => {
              let date;
              try {
                date = new Date(message.timestamp.$date);
              } catch(e) {
                return undefined;
              }
              return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            },
            message => message
            ),
          mergeMap((group$) =>
            group$.pipe(
              reduce((acc, value) => [...acc, value], [`${group$.key}`]))
          ),
          map((arr) => ({ date: arr[0], messages: arr.slice(1) }))
        )
      )
    ).subscribe(group => {
      this.messageGroups.set(group.date as string, group.messages as Message[]);
    })
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
