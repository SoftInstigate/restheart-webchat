import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {StatusService} from "../services/status.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    public statusService: StatusService
  ) {

  }

  ngOnInit(): void {
    this.messageService.openConnection();
  }

}
