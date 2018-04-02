import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BottleService, BottleType, BottleTypeService, Compartment, UserService} from '../../api';

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
  dataCopy: any;

  @ViewChild('fileInput') fileInput;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bottleTypeService: BottleTypeService,
    public bottleService: BottleService,
    public userService: UserService,
    private dialogRef: MatDialogRef<EditBottleComponent>) {

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

    this.dataCopy = Object.assign({}, data);
  }

  save() {
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      let currentTime = new Date().getTime();
      formData.append("file", fileBrowser.files[0], currentTime + '.jpg');

      this.bottleService.uploadBottleFile(formData).subscribe(
        data => {
          this.dataCopy.photoUrl = this.PATH + currentTime;

          this.bottleService.updateBottle(this.dataCopy).subscribe(
            res => {
              this.dialogRef.close(res);
            }
          );
        }
      )
    } else {
      this.bottleService.updateBottle(this.dataCopy).subscribe(
        res => {
          this.dialogRef.close(res);
        }
      );
    }
  }

  replaceReferenceBottleType() {
    for(let bt of this.bottleTypes) {
      if(JSON.stringify(this.dataCopy.type) === JSON.stringify(bt)) {
        this.dataCopy.type = bt;
      }
    }
  }

  replaceReferenceCompartment() {
    for(let c of this.compartments) {
      if(JSON.stringify(this.dataCopy.compartment) === JSON.stringify(c)) {
        this.dataCopy.compartment = c;
      }
    }
  }
}
