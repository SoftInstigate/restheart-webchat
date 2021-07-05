import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';
import { map } from 'rxjs/operators';
import {UserService} from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  messages: Array<Message> = [];

  content: FormControl = new FormControl('');

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private router: Router
    ) {

  }

  ngOnInit(): void {

    // this.messageService.getMessageHistory().subscribe(messages => this.messages = messages);

    // this.messageService.openConnection().subscribe(
    //   message => {
    //     console.log(message);
    //
    //     this.messages.push(message);
    //   },
    //   err => console.error('Error occured: ', err),
    //   () => console.log('Bye')
    // );
    this.messageService.openConnection();
  }


  send(): void {
    this.messageService.sendMessage(this.content.value);
    this.content.reset();
  }



  // logout():void {
  //   this.userService.logout();
  //   this.router.navigateByUrl('pick-nickname');
  // }

}
