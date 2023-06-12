import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportinformationComponent } from './supportinformation.component';

describe('SupportinformationComponent', () => {
  let component: SupportinformationComponent;
  let fixture: ComponentFixture<SupportinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportinformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
