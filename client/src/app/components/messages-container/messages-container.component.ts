import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {Message} from "../../models/message";
import {Observable} from "rxjs";

@Component({
  selector: 'app-messages-container',
  templateUrl: './messages-container.component.html',
  styleUrls: ['./messages-container.component.scss']
})
export class MessagesContainerComponent implements OnInit, AfterViewInit {

  @ViewChild('flag') private flag: ElementRef<HTMLDivElement>;
  messages$: Observable<Message[]>;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.onMessageSent$.subscribe(() => this.scrollBottom('smooth', 150));
    this.messages$ = this.messageService.getChatMessages();
  }

  ngAfterViewInit(): void {
    this.scrollBottom();
  }

  scrollBottom(behavior: ScrollBehavior = "auto", delay: number = 70): void {
    setTimeout(() => {
      this.flag.nativeElement.scrollIntoView({block: "end", behavior: behavior})
    }, delay);
  }

}
