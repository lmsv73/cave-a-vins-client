import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {EditBottleComponent} from '../edit-bottle/edit-bottle.component';

@Component({
  selector: 'app-delete-bottle',
  templateUrl: './delete-bottle.component.html',
  styleUrls: ['./delete-bottle.component.css']
})
export class DeleteBottleComponent {

  constructor(private dialogRef: MatDialogRef<EditBottleComponent>) { }

  accept() {
    this.dialogRef.close("T");
  }

}
