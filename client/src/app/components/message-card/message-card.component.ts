import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../models/message';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss']
})
export class MessageCardComponent implements OnInit {

  @Input() message: Message;

  constructor() { }

  ngOnInit(): void {
    console.log(this.message);
  }

}
