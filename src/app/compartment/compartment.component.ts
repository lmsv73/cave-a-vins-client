import { Component } from '@angular/core';
import { UserService} from '../api';
import {MatDialog} from '@angular/material';
import {EditCompartmentComponent} from '../edit-compartment/edit-compartment.component';

@Component({
  selector: 'app-compartment',
  templateUrl: './compartment.component.html',
  styleUrls: ['./compartment.component.css']
})
export class CompartmentComponent  {
  compartments: any;

  constructor(
    public userService: UserService,
    public dialog: MatDialog) {

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
      for(let i = 0; i < this.compartments.length; ++i) {
        if(res.id == this.compartments[i].id) {
          this.compartments[i].name = res.name;
          this.compartments[i].photoUrl = res.photoUrl;
        }
      }
    });
  }

}
