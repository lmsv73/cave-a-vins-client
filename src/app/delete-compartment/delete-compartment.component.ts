import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditCompartmentComponent} from '../edit-compartment/edit-compartment.component';

@Component({
  selector: 'app-delete-compartment',
  templateUrl: './delete-compartment.component.html',
  styleUrls: ['./delete-compartment.component.css']
})
export class DeleteCompartmentComponent {

  isDeletable: boolean;

  constructor(
    private dialogRef: MatDialogRef<EditCompartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.isDeletable = data.bottles.length == 0;
  }

  accept() {
    this.dialogRef.close("T");
  }

}
