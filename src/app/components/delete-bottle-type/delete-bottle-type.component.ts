import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-bottle-type',
  templateUrl: './delete-bottle-type.component.html',
  styleUrls: ['./delete-bottle-type.component.css']
})
export class DeleteBottleTypeComponent {

  isDeletable: boolean;

  constructor(
    private dialogRef: MatDialogRef<DeleteBottleTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.isDeletable = data.valide != true;
  }

  accept() {
    this.dialogRef.close("T");
  }

}
