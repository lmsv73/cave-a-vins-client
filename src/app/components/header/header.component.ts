import { Component } from '@angular/core';
import {UserService} from '../../api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'Cave à vins';
  currentUser: any;

  constructor(public userService: UserService) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.currentUser = currentUser;
  }


}
