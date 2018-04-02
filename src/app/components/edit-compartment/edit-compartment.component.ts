import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditBottleComponent} from '../edit-bottle/edit-bottle.component';
import {Compartment, CompartmentService, UserService} from '../../api/index';

@Component({
  selector: 'app-edit-compartment',
  templateUrl: './edit-compartment.component.html',
  styleUrls: ['./edit-compartment.component.css']
})
export class EditCompartmentComponent {
  PATH = "http://localhost:8080/images/";
  dataCopy: any;
  compartments: Compartment[];
  nameExist = false;
  initName: string;

  @ViewChild('fileInput') fileInput;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditBottleComponent>,
    private compartmentService: CompartmentService,
    private userService: UserService) {

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    userService.getCompartment(currentUser.user.username).subscribe(
      data => {
        this.compartments = data;
      });

    this.dataCopy = Object.assign({}, data);
    this.initName = this.dataCopy.name;
  }

  save() {
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      let currentTime = new Date().getTime();
      formData.append("file", fileBrowser.files[0], currentTime + '.jpg');

      this.compartmentService.uploadCompartmentFile(formData).subscribe(
        data => {
          this.dataCopy.photoUrl = this.PATH + currentTime;

          this.compartmentService.updateCompartment(this.dataCopy).subscribe(
            res => {
              this.dialogRef.close(res);
            }
          );
        }
      )
    } else {
      this.compartmentService.updateCompartment(this.dataCopy).subscribe(
        data => {
          this.dialogRef.close(data);
        }
      )
    }
  }

  activeButton() {
    this.nameExist = false;
    for(let i = 0; i < this.compartments.length; ++i) {
      if(this.dataCopy.name == this.compartments[i].name && this.initName != this.dataCopy.name) {
        this.nameExist = true;
      }
    }
  }
}
