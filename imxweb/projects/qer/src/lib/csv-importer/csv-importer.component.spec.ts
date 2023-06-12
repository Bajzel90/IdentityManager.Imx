import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvImporterComponent } from './csv-importer.component';

describe('CsvImporterComponent', () => {
  let component: CsvImporterComponent;
  let fixture: ComponentFixture<CsvImporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvImporterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvImporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
