import { Component, ElementRef, Input, OnInit } from '@angular/core';
import {Message} from "../../models/message";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: Message;

  isMine: string = '';

  constructor(public userService: UserService, public elRef: ElementRef) {
  }

  ngOnInit(): void {
    this.isMine = this.userService.getCurrentUser() === this.message.from
        ? 'owner'
        : 'other-message'
  }


}
