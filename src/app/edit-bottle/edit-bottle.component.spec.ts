import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBottleComponent } from './edit-bottle.component';

describe('EditBottleComponent', () => {
  let component: EditBottleComponent;
  let fixture: ComponentFixture<EditBottleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBottleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBottleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
