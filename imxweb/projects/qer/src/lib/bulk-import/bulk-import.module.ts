import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkImporterComponent } from './bulk-importer/bulk-importer.component';



@NgModule({
  declarations: [
    BulkImporterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BulkImporterComponent
  ]
})
export class BulkImportModule { }
