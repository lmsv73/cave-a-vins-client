import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditBottleComponent} from '../edit-bottle/edit-bottle.component';
import {CompartmentService} from '../api';

@Component({
  selector: 'app-edit-compartment',
  templateUrl: './edit-compartment.component.html',
  styleUrls: ['./edit-compartment.component.css']
})
export class EditCompartmentComponent {

  dataCopy: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditBottleComponent>,
    private compartmentService: CompartmentService) {

    this.dataCopy = Object.assign({}, data);
  }

  save() {
    this.compartmentService.updateCompartment(this.dataCopy).subscribe(
      data => {
        this.dialogRef.close(data);
      }
    )
  }
}
