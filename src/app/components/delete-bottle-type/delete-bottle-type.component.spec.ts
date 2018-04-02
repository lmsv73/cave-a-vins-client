import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBottleTypeComponent } from './delete-bottle-type.component';

describe('DeleteBottleTypeComponent', () => {
  let component: DeleteBottleTypeComponent;
  let fixture: ComponentFixture<DeleteBottleTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBottleTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBottleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
