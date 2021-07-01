import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-nickname',
  templateUrl: './nickname-picker.component.html',
  styleUrls: ['./nickname-picker.component.scss']
})
export class NicknamePickerComponent implements OnInit {

  nicknameControl: FormControl = new FormControl('');
  redirectTo: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.redirectTo = this.activatedRoute.snapshot.queryParams.redirectTo;
  }

  ngOnInit(): void {
  }


  saveNickname(): void {
    this.userService.setCurrentUser(this.nicknameControl.value);
    this.router.navigateByUrl(this.redirectTo);
  }

}
