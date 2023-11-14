import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeMapOpertorComponent } from './merge-map-opertor.component';

describe('MergeMapOpertorComponent', () => {
  let component: MergeMapOpertorComponent;
  let fixture: ComponentFixture<MergeMapOpertorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeMapOpertorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeMapOpertorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
