import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekRecordComponent } from './week-record.component';

describe('WeekRecordComponent', () => {
  let component: WeekRecordComponent;
  let fixture: ComponentFixture<WeekRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
