import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvsyncComponent } from './csvsync.component';

describe('CsvsyncComponent', () => {
  let component: CsvsyncComponent;
  let fixture: ComponentFixture<CsvsyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvsyncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
