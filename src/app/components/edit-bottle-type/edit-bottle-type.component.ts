import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BottleType, BottleTypeService} from '../../api';
import {RegionService} from "../../api/api/region.service";

@Component({
  selector: 'app-edit-bottle-type',
  templateUrl: './edit-bottle-type.component.html',
  styleUrls: ['./edit-bottle-type.component.css']
})
export class EditBottleTypeComponent {
  bottleTypes: BottleType[];
  dataCopy: any;
  years = [];
  regionList: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditBottleTypeComponent>,
    public regionService: RegionService,
    private bottleTypeService: BottleTypeService) {

    this.bottleTypes = data;
    this.dataCopy = Object.assign({}, data);

    let d = new Date();
    for(let i = d.getFullYear(); i >= 1800; --i) {
      this.years.push(i);
    }

    regionService.getRegions().subscribe(
      data => {
        this.regionList = data;
      });
  }

  save() {
    this.bottleTypeService.updateBottleType(this.dataCopy).subscribe(
      res => {
        this.dialogRef.close(res);
      }
    );
  }
}
