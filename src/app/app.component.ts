import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Bottle, UserService} from './api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Cave à vins';
  ELEMENT_DATA: Bottle[];
  dataSource;

  constructor(
    public userService: UserService) {
      this.userService.getBottleByUserName("ludo").subscribe(data => {
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


