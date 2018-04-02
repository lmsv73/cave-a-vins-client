import { Component } from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Bottle, BottleService, UserService} from '../../api/index';
import {Router} from '@angular/router';
import {EditBottleComponent} from '../edit-bottle/edit-bottle.component';
import {DeleteBottleComponent} from '../delete-bottle/delete-bottle.component';

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
    public dialog: MatDialog,
    public bottleService: BottleService) {

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
      if(res != undefined) {
        for(let i = 0; i < this.ELEMENT_DATA.length; ++i) {
          if(this.ELEMENT_DATA[i].id == res.id) {
            this.ELEMENT_DATA[i] = res;
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          }
        }
      }
    });
  }


  delete(data) {
    this.dialog.open(DeleteBottleComponent, {
      data: data,
      width: '500px'
    }).afterClosed().subscribe(
      res => {
        if(res == "T") {
          this.bottleService.deleteBottle(data.id).subscribe(
            res2 => {
              for(let i = 0; i < this.ELEMENT_DATA.length; ++i) {
                if(this.ELEMENT_DATA[i].id == data.id) {
                  this.ELEMENT_DATA.splice(i, 1);
                  this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                }
              }
            }
          )
        }
      }
    );
  }
}

