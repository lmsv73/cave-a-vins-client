import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BottleType, BottleTypeService} from '../../api';

@Component({
  selector: 'app-edit-bottle-type',
  templateUrl: './edit-bottle-type.component.html',
  styleUrls: ['./edit-bottle-type.component.css']
})
export class EditBottleTypeComponent {
  bottleTypes: BottleType[];
  dataCopy: any;
  years = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditBottleTypeComponent>,
    private bottleTypeService: BottleTypeService) {

    this.bottleTypes = data;
    this.dataCopy = Object.assign({}, data);

    let d = new Date();
    for(let i = d.getFullYear(); i >= 1800; --i) {
      this.years.push(i);
    }
  }

  save() {
    this.bottleTypeService.updateBottleType(this.dataCopy).subscribe(
      res => {
        this.dialogRef.close(res);
      }
    );
  }
}
