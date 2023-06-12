import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'imx-csv-importer',
  templateUrl: './csv-importer.component.html',
  styleUrls: ['./csv-importer.component.scss']
})
export class CsvImporterComponent implements OnInit {

  constructor(
    private readonly translate: TranslateService,
  ) { }

  csvFiles: File[] = [];

  public validateFile(input: any) {
    const files: FileList = input.files;
    const allowedExtensions = /(\.csv)$/i;

    for (let i = 0; i < files.length; i++) {
      const file: File = files.item(i);

      if (!allowedExtensions.exec(file.name)) {
        alert('Please select a valid CSV file.');
        input.value = '';
        return false;
      }

      this.csvFiles.push(file);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        const csv: string = reader.result as string;
      }
    }
  }

  public getFileSize(size: number): string {
    const bytes = size;
    const kilobytes = bytes / 1024;
    const megabytes = kilobytes /1024;
    const gigabytes = megabytes /1024;

    if (gigabytes >= 1) {
      return gigabytes.toFixed(2) + ' GB';
    } else if (megabytes >= 1) {
      return megabytes.toFixed(2) + ' MB';
    } else if (kilobytes >= 1) {
      return kilobytes.toFixed(2) + ' KB';
    } else {
      return bytes.toFixed(2) + ' bytes';
    }
  }

  ngOnInit(): void {
  }
}
