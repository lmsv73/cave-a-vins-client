import {Component, ViewChild} from '@angular/core';
import {BottleType, BottleTypeService, Compartment, UserService, Bottle, BottleService, CompartmentService} from '../../api/index';
import {Router} from '@angular/router';
import {RegionService} from "../../api/api/region.service";
import {FormControl} from "@angular/forms";
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {Observable} from "rxjs/Observable";

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
  regionList: string[];
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

  filteredRegions: Observable<any[]>;
  regionCtrl: FormControl;

  selectedBottleType: BottleType;
  isNumber = true;

  @ViewChild('fileInput') fileInput;
  @ViewChild('fileCompart') fileCompart;

  constructor(
    public userService: UserService,
    public bottleTypeService: BottleTypeService,
    public bottleService: BottleService,
    public router: Router,
    public regionService: RegionService,
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
    this.regionCtrl = new FormControl();

    regionService.getRegions().subscribe(
      data => {
        this.regionList = data;

        this.filteredRegions = this.regionCtrl.valueChanges
          .pipe(
            startWith(''),
            map(region => region ? this.filterRegions(region) : this.regionList.slice())
        );

    });

    let d = new Date();
    for(let i = d.getFullYear(); i >= 1800; --i) {
      this.years.push(i);
    }
  }

  filterRegions(name: string) {
    return this.regionList.filter(region =>
      region.toLowerCase().indexOf(name.toLowerCase()) === 0);
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
        this.router.navigate(['compartments']);
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

  checkNumber() {
    this.isNumber = !isNaN(this.number);
  }
}
