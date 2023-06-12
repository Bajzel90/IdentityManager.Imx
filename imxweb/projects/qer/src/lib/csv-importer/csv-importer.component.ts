import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'imx-csv-importer',
  templateUrl: './csv-importer.component.html',
  styleUrls: ['./csv-importer.component.scss']
})
export class CsvImporterComponent{

  constructor(private readonly translate: TranslateService,) { }

  csvFiles: File[] = [];

  public UploadCsv(files: FileList) {
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {

        let file: File = files.item(i);
        let allowedExtensions = /(\.csv)$/i; //Show only .csv files
        
        //Won't allow any other file extension
        if (!allowedExtensions.exec(file.name)) {
          alert('Please choose a CSV file.');
          continue;
        }
        
        this.csvFiles.push(file);
        
        let reader: FileReader = new FileReader(); //Browser API to read the file contents
        reader.readAsText(file);
        reader.onload = (e) => {
          let csv: string = reader.result as string;
        };
      }
    }
  } 
  
  //Change the size format based on the number of bytes for user readability
  public formatFileSize(size: number): string {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    let fileSize = size;
    
    while (fileSize >= 1024 && unitIndex < units.length - 1) {
      fileSize /= 1024;
      unitIndex++;
    }
    
    return fileSize.toFixed(2) + ' ' + units[unitIndex];
  }
}
