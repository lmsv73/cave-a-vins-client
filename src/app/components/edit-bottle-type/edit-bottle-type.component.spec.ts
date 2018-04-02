import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBottleTypeComponent } from './edit-bottle-type.component';

describe('EditBottleTypeComponent', () => {
  let component: EditBottleTypeComponent;
  let fixture: ComponentFixture<EditBottleTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBottleTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBottleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
