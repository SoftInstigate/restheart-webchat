import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NicknamePickerComponent } from './nickname/nickname-picker.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SearchComponent } from './components/search/search.component';
import { ContactsContainerComponent } from './components/contacts-container/contacts-container.component';
import { ContactComponent } from './components/contact/contact.component';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { ChatHeaderComponent } from './components/chat-header/chat-header.component';
import { MessageComponent } from './components/message/message.component';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { MessagesContainerComponent } from './components/messages-container/messages-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NicknamePickerComponent,
    PageNotFoundComponent,
    SideNavComponent,
    SearchComponent,
    ContactsContainerComponent,
    ContactComponent,
    ChatContainerComponent,
    ChatHeaderComponent,
    MessageComponent,
    MessageInputComponent,
    MessagesContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
