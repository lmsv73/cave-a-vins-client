import { Component } from '@angular/core';
import {BottleType, BottleTypeService} from '../../api';
import {animate, style, transition, trigger} from '@angular/animations';

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

  constructor(bottleTypeService: BottleTypeService) {
    bottleTypeService.getAllBottleTypes().subscribe(
      data => {
        this.bottleTypes = data;
      }
    );
  }
}
