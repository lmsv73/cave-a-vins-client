import {Component} from '@angular/core';
import {BottleType, BottleTypeService, Compartment, UserService, Bottle, BottleService} from '../api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-bottle',
  templateUrl: './add-bottle.component.html',
  styleUrls: ['./add-bottle.component.css']
})
export class AddBottleComponent {
  compartments: Compartment[];
  bottleTypes: BottleType[];
  bottle: Bottle;
  years = [];

  colour: string;
  region: string;
  cp: Compartment;
  bt: BottleType;
  date: number;
  number: number;

  constructor(
    public userService: UserService,
    public bottleTypeService: BottleTypeService,
    public bottleService: BottleService,
    public router: Router) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    userService.getCompartment(currentUser.user.username).subscribe(
      data => {
        this.compartments = data;
      });

    bottleTypeService.getBottlesType().subscribe(
      data => {
        this.bottleTypes = data;
      }
    )

    let d = new Date();
    for(let i = d.getFullYear(); i >= 1800; --i) {
      this.years.push(i);
    }
  }

  addBottle() {
    this.bottle = {
      colour: this.colour,
      region: this.region,
      compartment: this.cp,
      date: this.date,
      nbBottles: this.number,
      type: this.bt,
      owner: JSON.parse(localStorage.getItem('currentUser')).user
    };

    this.bottleService.createBottle(this.bottle).subscribe(
      data => {
        this.router.navigate(['']);
      }
    )
  }

}
