import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../services/message.service";
import {Message} from "../../models/message";
import {Observable} from "rxjs";

@Component({
  selector: 'app-messages-container',
  templateUrl: './messages-container.component.html',
  styleUrls: ['./messages-container.component.scss']
})
export class MessagesContainerComponent implements OnInit {

  messages$: Observable<Message[]>;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
   this.messages$ = this.messageService.getChatMessages();

  }

}
