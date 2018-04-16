import {Component, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {Bottle, BottleService, UserService} from '../../api/index';
import {EditBottleComponent} from '../edit-bottle/edit-bottle.component';
import {DeleteBottleComponent} from '../delete-bottle/delete-bottle.component';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {
  ELEMENT_DATA: Bottle[];
  displayedColumns = ['name', 'region', 'colour', 'compartment', 'date', 'number', 'photo', 'actionsColumn'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;

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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  sortData(sort: Sort) {
    const data = this.ELEMENT_DATA.slice();
    if (!sort.active || sort.direction == '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a:any, b:any) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'region': return compare(a.type.region, b.type.region, isAsc);
        case 'colour': return compare(a.type.colour, b.type.colour, isAsc);
        case 'compartment': return compare(a.compartment.name, b.compartment.name, isAsc);
        case 'date': return compare(a.type.date, b.type.date, isAsc);
        case 'number': return compare(a.nbBottles, b.nbBottles, isAsc);
        default: return 0;
      }
    });
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
            this.dataSource.data = this.ELEMENT_DATA.slice();
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
                  this.dataSource.data = this.ELEMENT_DATA.slice();
                }
              }
            }
          )
        }
      }
    );
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
