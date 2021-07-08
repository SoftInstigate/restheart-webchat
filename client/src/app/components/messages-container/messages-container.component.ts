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
import { filter, map, scan, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  constructor(
    private messageService: MessageService,
    private elRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.messages$ = this.messageService.getChatMessages();
  }

  ngAfterViewInit(): void {

    this.containerChildren.changes
      .pipe(
        startWith([]),
        scan((firstValue, value) => {
          if (!firstValue) {
            this.scrollBottom('auto');
          } else this.scrollBottom('smooth');
          firstValue = value;
        }, null)
      )
      .subscribe();
  }

  infiniteScroll() {
    this.messageService.getOlderMessages(++this.currentPage);
  }

  scrollBottom(behavior: ScrollBehavior = 'auto'): void {
    this.elRef.nativeElement.style.scrollBehavior = behavior;
    this.elRef.nativeElement.scrollTop = this.elRef.nativeElement.scrollHeight;
    //this.flag.nativeElement.scrollIntoView({ block: "end", behavior: behavior })
  }
}
