import { Component, OnInit } from '@angular/core';
import {Message} from "../../models/message";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
