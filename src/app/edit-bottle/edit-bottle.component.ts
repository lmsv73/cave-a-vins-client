import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {BottleService, BottleType, BottleTypeService, Compartment, UserService} from '../api';

@Component({
  selector: 'app-edit-bottle',
  templateUrl: './edit-bottle.component.html',
  styleUrls: ['./edit-bottle.component.css']
})
export class EditBottleComponent  {
  PATH = "http://localhost:8080/images/";
  bottleTypes: BottleType[];
  compartments: Compartment[];
  years = [];

  @ViewChild('fileInput') fileInput;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bottleTypeService: BottleTypeService,
    public bottleService: BottleService,
    public userService: UserService) {

    let d = new Date();
    for(let i = d.getFullYear(); i >= 1800; --i) {
      this.years.push(i);
    }

    bottleTypeService.getBottlesType().subscribe(
      data => {
        this.bottleTypes = data;
        this.replaceReferenceBottleType();
      }
    );

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    userService.getCompartment(currentUser.user.username).subscribe(
      data => {
        this.compartments = data;
        this.replaceReferenceCompartment();
      });
  }

  save() {
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      let currentTime = new Date().getTime();
      formData.append("file", fileBrowser.files[0], currentTime + '.jpg');

      this.bottleService.uploadBottleFile(formData).subscribe(
        data => {
          this.data.photoUrl = this.PATH + currentTime;

          this.bottleService.updateBottle(this.data).subscribe();
        }
      )
    } else {
      this.bottleService.updateBottle(this.data).subscribe();
    }
  }

  cancel() {

  }

  replaceReferenceBottleType() {
    for(let bt of this.bottleTypes) {
      if(JSON.stringify(this.data.type) === JSON.stringify(bt)) {
        this.data.type = bt;
      }
    }
  }

  replaceReferenceCompartment() {
    for(let c of this.compartments) {
      if(JSON.stringify(this.data.compartment) === JSON.stringify(c)) {
        this.data.compartment = c;
      }
    }
  }
}
