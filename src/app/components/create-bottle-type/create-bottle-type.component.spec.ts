import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBottleTypeComponent } from './create-bottle-type.component';

describe('CreateBottleTypeComponent', () => {
  let component: CreateBottleTypeComponent;
  let fixture: ComponentFixture<CreateBottleTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBottleTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBottleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
