import { Component } from '@angular/core';
import {BottleType, BottleTypeService} from '../../api';
import {animate, style, transition, trigger} from '@angular/animations';
import {EditCompartmentComponent} from '../edit-compartment/edit-compartment.component';
import {MatDialog} from '@angular/material';
import {EditBottleTypeComponent} from '../edit-bottle-type/edit-bottle-type.component';
import {DeleteCompartmentComponent} from '../delete-compartment/delete-compartment.component';
import {DeleteBottleTypeComponent} from '../delete-bottle-type/delete-bottle-type.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition('* => *', [
          style({ opacity: 0}),
          animate('500ms', style({transform: 'rotateY(360deg)', opacity: 1}))
        ])
      ]
    )
  ]
})
export class AdminComponent {
  bottleTypes: BottleType[];

  constructor(
    public bottleTypeService: BottleTypeService,
    public dialog: MatDialog) {

    bottleTypeService.getAllBottleTypes().subscribe(
      data => {
        this.bottleTypes = data;
      }
    );
  }

  edit(data) {
    this.dialog.open(EditBottleTypeComponent, {
      data: data,
      width: '500px'
    }).afterClosed().subscribe(res => {
      if(res != undefined) {
        for(let i = 0; i < this.bottleTypes.length; ++i) {
          if(res.id == this.bottleTypes[i].id) {
            this.bottleTypes[i].name = res.name;
            this.bottleTypes[i].valide = res.valide;
            this.bottleTypes[i].colour = res.colour;
            this.bottleTypes[i].region = res.region;
            this.bottleTypes[i].date = res.date;
          }
        }
      }
    });
  }

  delete(data) {
    this.dialog.open(DeleteBottleTypeComponent, {
      data: data,
      width: '500px'
    }).afterClosed().subscribe(
      res => {
        if(res == "T") {
          this.bottleTypeService.deleteBottleType(data.id).subscribe(
            data2 => {
              for(let i = 0; i < this.bottleTypes.length; ++i) {
                if(data.id == this.bottleTypes[i].id) {
                  this.bottleTypes.splice(i, 1);
                }
              }
            }
          )
        }
      }
    );
  }
}
