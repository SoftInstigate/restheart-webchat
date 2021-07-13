import {Component, OnDestroy, OnInit} from '@angular/core';
import {StatusService} from '../../services/status.service';
import {Subscription} from 'rxjs';

interface Status {
  isConnected: boolean;
  message: 'Connected: Let\'s chat' | 'Trying to reconnect...';
}

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent implements OnInit, OnDestroy {

  statusSubscription: Subscription;
  status: Status;

  constructor(public statusService: StatusService) { }

  ngOnInit(): void {
    this.statusSubscription = this.statusService.connectionStatus$.subscribe(
      status => status ?
          this.status = {isConnected: status, message: 'Connected: Let\'s chat'}
          : this.status = {isConnected: status, message: 'Trying to reconnect...'}

    );
  }

  ngOnDestroy(): void {
    this.statusSubscription.unsubscribe();
  }

}
