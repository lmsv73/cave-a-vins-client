import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {BottleType, BottleTypeService, Compartment, UserService} from '../api';

@Component({
  selector: 'app-edit-bottle',
  templateUrl: './edit-bottle.component.html',
  styleUrls: ['./edit-bottle.component.css']
})
export class EditBottleComponent  {

  bottleTypes: BottleType[];
  compartments: Compartment[];
  years = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    bottleTypeService: BottleTypeService,
    userService: UserService) {

    let d = new Date();
    for(let i = d.getFullYear(); i >= 1800; --i) {
      this.years.push(i);
    }

    bottleTypeService.getBottlesType().subscribe(
      data => {
        this.bottleTypes = data;
      }
    );

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    userService.getCompartment(currentUser.user.username).subscribe(
      data => {
        this.compartments = data;
      });
  }


}
