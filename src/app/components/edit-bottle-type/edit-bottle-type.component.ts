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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditBottleTypeComponent>,
    private bottleTypeService: BottleTypeService) {

    this.bottleTypes = data;
    this.dataCopy = Object.assign({}, data);
  }

  save() {
    this.bottleTypeService.updateBottleType(this.dataCopy).subscribe(
      res => {
        this.dialogRef.close(res);
      }
    );
  }


}
