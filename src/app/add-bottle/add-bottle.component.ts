import {Component, ViewChild} from '@angular/core';
import {BottleType, BottleTypeService, Compartment, UserService, Bottle, BottleService} from '../api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-bottle',
  templateUrl: './add-bottle.component.html',
  styleUrls: ['./add-bottle.component.css']
})
export class AddBottleComponent {
  PATH = "http://localhost:8080/images/";
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
  photoUrl = null;

  @ViewChild('fileInput') fileInput;

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
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      let currentTime = new Date().getTime();
      formData.append("file", fileBrowser.files[0], currentTime + '.jpg');

      this.bottleService.uploadBottleFile(formData).subscribe(
        data => {
          this.photoUrl = this.PATH + currentTime;

          this.bottle = {
            colour: this.colour,
            region: this.region,
            compartment: this.cp,
            date: this.date,
            nbBottles: this.number,
            type: this.bt,
            owner: JSON.parse(localStorage.getItem('currentUser')).user,
            photoUrl: this.photoUrl
          };

          this.bottleService.createBottle(this.bottle).subscribe(
            data => {
              this.router.navigate(['']);
            }
          )
        }
      )
    }
  }
}
