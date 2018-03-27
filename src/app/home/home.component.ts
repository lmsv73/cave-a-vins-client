import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Bottle, UserService} from '../api';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {
  ELEMENT_DATA: Bottle[];
  dataSource;

  constructor(
    public userService: UserService) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getBottleByUserName(currentUser.user.username).subscribe(data => {
      this.ELEMENT_DATA = data;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    });
  }

  displayedColumns = ['name', 'region', 'colour', 'compartment', 'date', 'number', 'photo'];


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

