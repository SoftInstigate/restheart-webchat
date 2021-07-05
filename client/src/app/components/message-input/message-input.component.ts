import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../services/message.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {

  messageInput: FormControl = new FormControl(
    '',
    [Validators.minLength(1), Validators.required]
  );

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.messageService.sendMessage(this.messageInput.value);
    this.messageInput.reset();
  }

}
