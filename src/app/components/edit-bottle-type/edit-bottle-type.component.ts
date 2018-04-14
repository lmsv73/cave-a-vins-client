import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BottleType, BottleTypeService} from '../../api';
import {RegionService} from "../../api/api/region.service";
import {FormControl} from "@angular/forms";
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {Observable} from "rxjs/Observable";

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
  filteredRegions: Observable<any[]>;
  regionCtrl: FormControl;

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
    this.regionCtrl = new FormControl();
    this.filteredRegions = this.regionCtrl.valueChanges
      .pipe(
        startWith(''),
        map(region => region ? this.filterRegions(region) : this.regionList.slice())
      );
  }

  filterRegions(name: string) {
    console.log(name);
    return this.regionList.filter(region =>
      region.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  save() {
    this.bottleTypeService.updateBottleType(this.dataCopy).subscribe(
      res => {
        this.dialogRef.close(res);
      }
    );
  }
}
