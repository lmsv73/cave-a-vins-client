import { Component, OnInit } from '@angular/core';
import {UserService} from '../api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Cave à vins';
  constructor(public userService: UserService) { }

  ngOnInit() {
  }

}
