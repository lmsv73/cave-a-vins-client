import { Component } from '@angular/core';
import { UserService} from '../api';
import {MatDialog} from '@angular/material';
import {EditCompartmentComponent} from '../edit-compartment/edit-compartment.component';
import { trigger, style, animate, transition } from '@angular/animations';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

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

  wait() {
    let timer = Observable.timer(5000);
    timer.subscribe(res => {
      return true;
    })
  }
}
