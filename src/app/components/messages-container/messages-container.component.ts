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
import { scan, startWith} from 'rxjs/operators';
import { Observable} from 'rxjs';
import {StatusService} from '../../services/status.service';

@Component({
  selector: 'app-messages-container',
  templateUrl: './messages-container.component.html',
  styleUrls: ['./messages-container.component.scss']
})
export class MessagesContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('flag') private flag: ElementRef<HTMLDivElement>;
  @ViewChildren('msg') private containerChildren: QueryList<MessageComponent>;

  messages$: Observable<Message[]>;
  currentPage = 1;
  firstElement: MessageComponent;

  loadMoreAction = false;

  constructor(
    private messageService: MessageService,
    private elRef: ElementRef,
    public statusService: StatusService
  ) { }

  ngOnInit(): void {

    this.messages$ = this.messageService.getChatMessages();
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
