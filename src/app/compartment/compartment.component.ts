import { Component } from '@angular/core';
import {CompartmentService, UserService} from '../api';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {EditCompartmentComponent} from '../edit-compartment/edit-compartment.component';
import { trigger, style, animate, transition } from '@angular/animations';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import {DeleteBottleComponent} from '../delete-bottle/delete-bottle.component';
import {DeleteCompartmentComponent} from '../delete-compartment/delete-compartment.component';

@Component({
  selector: 'app-compartment',
  templateUrl: './compartment.component.html',
  styleUrls: ['./compartment.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition('* => *', [
          style({ opacity: 0}),
          animate('500ms', style({transform: 'rotateY(360deg)', opacity: 1}))
        ])
      ]
    )
  ]
})
export class CompartmentComponent  {
  compartments: any;

  constructor(
    public userService: UserService,
    public dialog: MatDialog,
    public compartmentService: CompartmentService) {

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    userService.getCompartment(currentUser.user.username).subscribe(
      data => {
        this.compartments = data;
        userService.getBottleByUserName(currentUser.user.username).subscribe(
          data2 => {
            for(let i = 0; i < this.compartments.length; ++i) {
              this.compartments[i].bottles = [];
              this.compartments[i].nbBottles = 0;
              this.compartments[i].nbBottlesTypes = 0;

              for(let bottle of data2) {
                if(this.compartments[i].id === bottle.compartment.id) {
                  this.compartments[i].bottles.push(bottle);
                  this.compartments[i].nbBottles += bottle.nbBottles;
                  this.compartments[i].nbBottlesTypes++;
                }
              }
            }
          }
        )
      });
  }

  edit(data) {
    this.dialog.open(EditCompartmentComponent, {
      data: data,
      width: '500px'
    }).afterClosed().subscribe(res => {
      if(res != undefined) {
        for(let i = 0; i < this.compartments.length; ++i) {
          if(res.id == this.compartments[i].id) {
            this.compartments[i].name = res.name;
            this.compartments[i].photoUrl = res.photoUrl;
          }
        }
      }
    });
  }

  delete(data) {
    this.dialog.open(DeleteCompartmentComponent, {
      data: data,
      width: '500px'
    }).afterClosed().subscribe(
      res => {
        if(res == "T") {
          this.compartmentService.deleteCompartment(data.id).subscribe(
            data2 => {
              for(let i = 0; i < this.compartments.length; ++i) {
                if(data.id == this.compartments[i].id) {
                  this.compartments.splice(i, 1);
                }
              }
            }
          )
        }
      }
    );
  }
}
