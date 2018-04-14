import {Component, ViewChild} from '@angular/core';
import {BottleType, BottleTypeService, Compartment, UserService, Bottle, BottleService, CompartmentService} from '../../api/index';
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

  newCompart: Compartment;
  nameCompartment: string;
  photoCompartment = null;

  newBottleType: BottleType;
  bottleTypeName: string;
  bottleTypeColour: string;
  bottleTypeRegion: string;
  bottleTypeDate: number;

  selectedBottleType: BottleType;

  @ViewChild('fileInput') fileInput;
  @ViewChild('fileCompart') fileCompart;

  constructor(
    public userService: UserService,
    public bottleTypeService: BottleTypeService,
    public bottleService: BottleService,
    public router: Router,
    public compartmentService: CompartmentService) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    userService.getCompartment(currentUser.user.username).subscribe(
      data => {
        this.compartments = data;
      });

    bottleTypeService.getBottlesType().subscribe(
      data => {
        this.bottleTypes = data;
      }
    );

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

          this.createBottle();
        }
      )
    } else {
      this.createBottle();
    }
  }

  createBottle() {
    this.bottle = {
      compartment: this.cp,
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


  addCompartment() {
    let fileBrowser = this.fileCompart.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      let currentTime = new Date().getTime();
      formData.append("file", fileBrowser.files[0], currentTime + '.jpg');

      this.compartmentService.uploadCompartmentFile(formData).subscribe(
        data => {
          this.photoCompartment = this.PATH + currentTime;

          this.createCompartment();
        }
      )
    } else {
      this.createCompartment();
    }
  }

  createCompartment() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.newCompart = {
      name: this.nameCompartment,
      owner: currentUser.user,
      photoUrl: this.photoCompartment
    };

    this.compartmentService.createCompartment(this.newCompart).subscribe(
      data => {
        this.compartments.push(this.newCompart);
        this.newCompart = null;
      }
    )
  }

  addBottleType() {
    this.newBottleType = {
      name: this.bottleTypeName,
      colour: this.bottleTypeColour,
      region: this.bottleTypeRegion,
      date: this.bottleTypeDate,
      valide: false
    };

    this.bottleTypeService.addBottleType(this.newBottleType).subscribe(
      data => {
        this.newBottleType = null;
      }
    )
  }

  loadBT(data) {
    this.selectedBottleType = data;
  }
}
