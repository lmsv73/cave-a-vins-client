import { Component } from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Bottle, UserService} from '../api';
import {Router} from '@angular/router';
import {EditBottleComponent} from '../edit-bottle/edit-bottle.component';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {
  ELEMENT_DATA: Bottle[];
  dataSource;

  constructor(
    public userService: UserService,
    public dialog: MatDialog) {

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getBottleByUserName(currentUser.user.username).subscribe(data => {
      this.ELEMENT_DATA = data;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    });
  }

  displayedColumns = ['name', 'region', 'colour', 'compartment', 'date', 'number', 'photo', 'actionsColumn'];

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  edit(data) {
    this.dialog.open(EditBottleComponent, {
      data: data,
      width: '500px'
    }).afterClosed().subscribe(res => {
      for(let i = 0; i < this.ELEMENT_DATA.length; ++i) {
        if(this.ELEMENT_DATA[i].id == res.id) {
          this.ELEMENT_DATA[i] = res;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        }
      }
    });
  }
}

