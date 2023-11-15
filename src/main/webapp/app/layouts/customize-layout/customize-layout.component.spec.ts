import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeLayoutComponent } from './customize-layout.component';

describe('CustomizeLayoutComponent', () => {
  let component: CustomizeLayoutComponent;
  let fixture: ComponentFixture<CustomizeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizeLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
